---
title: JavaScript之变量、执行环境及作用域
date: 2020-08-11
sidebar: 'auto'
categories:
  前端笔记
tags:
  [JavaScript]
---

## 变量

ECMAScript 变量可能包含两种不同数据类型的值：基本类型值和引用类型值。基本类型值指的是简单的数据段，而引用类型值指那些可能由多个值构成的对象。

这里先简单说一下两个概念：堆内存和栈内存。

堆内存：先进先出（类似单向的管道，排队往前走，先进的先出去）；是动态分配的内存，大小不一且不会被系统自动释放。 

栈内存：后进先出（类似只有一个出口的管道，后面进入的先出去）；是自动分配相对固定大小的内存，且会被系统自动释放。

### 基本类型

Undefined、Null、Boolean、Number、String、Symbol和BigInt。他们都是按值存储在栈内存中，每种类型的数据占用内存的大小都是固定的，由系统自动分配和释放。

```js
var a = 10;
var b = a;
b = 20;
console.log(a); // 10
console.log(b); // 20复制代码
```



![img](https://user-gold-cdn.xitu.io/2020/3/17/170e6dbcd0c7c1ae?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 引用类型

除了上述五种基本类型外都是引用类型，例如Object，Array，Function等。js不允许直接访问堆内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际是在操作对象的引用而不是实际的对象，是按地址访问的。（ 即：引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址，通过这个引用地址可以快速查找到保存中堆内存中的对象。）

```js
var obj1 = new Object();
var obj2 = obj1;
obj2.name = 'hexh';
console.log(obj1.name); //  hexh复制代码
```

obj1和obj2指向了堆内存中的同一个对象。var obj2 = obj1;，实际上是将这个存储在堆内存中的对象，在栈内存的引用地址复制了一份给obj2，但是实际上他们共同指向了同一个堆内存对象，所以修改obj2其实就是修改那个对象，所以通过obj1访问也能访问的到。

![img](https://user-gold-cdn.xitu.io/2020/3/17/170e728063b8aaf1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 参数传递

ECMAScript 中所有函数的参数都是按值传递。也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。基本类型值的传递如何基本类型变量的复制一样，而引用类型值的传递，则如同引用类型变量的复制一样。

- 基本类型值传递

  ```js
  function sum (num) {
      num += 10;
      return num;
  }
  
  ver count = 20;
  var res = sum(count);
  console.log(count); // 20
  console.log(res); // 30复制代码
  ```

函数 sum() 有一个参数 num，而参数 num 实际上是该函数的局部变量。在调用 sum() 函数时，变量 count 作为参数传递给该函数时，值是20。于是 20 被复制给参数 num 以便在 sum() 中使用。在函数内部，参数 num 的值被加上了 10，但这个操作不会影响函数外部的 count 变量。参数 num 和 count 互不认识，它们仅仅是具有相同的值。

- 引用类型值传递

  例子1：

  ```js
  function setName (obj) {
      obj.name = 'hexh'
  }
  var person = new Object();
  setName(person);
  console.log(person.name); // hexh复制代码
  ```

  创建一个对象，并将其保存在变量person中。然后该变量传递到 setName() 函数中之后，被复制给了 obj。在这个函数内部，obj 和 person 引用的是同一个对象。（即时这个变量是按值传递的，obj 也会按引用来访问同一个对象。）

  有很多开发人员错误地认为：在局部作用域中修改的对象在全局作用域中反映出来，就说明参数是按引用传递的。

  例子2：

  ```js
  function setName (obj) {
      obj.name = 'hexh'
      obj = new Object();
      obj.name = 'test'
  }
  var person = new Object();
  setName(person);
  console.log(person.name); // hexh复制代码
  ```

  通过例子2可以看出，如果 person 是按引用传递的，那么 person 会被指向 obj 新对象。但打印 person.name，显示的值仍然是 "hexh"。这说明即使在函数内部修改了参数的值，但原始的引用仍然保持不变。

总结：

当引用类型的数据 Object 传递给函数时，也是使用的值传递。我是这样理解的：

此时传递给函数的是 Object 在栈内存中的 “引用地址”（A）。

“A” 被传递给函数的过程，其实是复制了 Object 在栈内存中的 “引用地址”（A） ，并将复制的结果赋值（值传递）给了函数的参数 “B” 。由于 “A” 和 “B”的引用地址都是指向堆内存的同一个对象，所以在函数中通过 “B” 修改对象属性的值时，打印 “A” 的结果显示和 “B” 一致。符合了例子1中的结果。而例子2的函数中，将 “B” 重新 new 了一个Object对象，相当于改变了 “B” 的引用地址，此时 “A” 和 “B” 是互不关联的。

## 执行环境

执行环境（execution context， EC）是JavaScript中最为重要的一个概念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的**变量对象**（variable object，VO），环境中定义的所有变量和函数都保存在这个对象中。

每当程序的执行流进入到一个可以执行的代码中时，就进入到了一个执行环境中。

执行环境分为三种：全局执行环境、函数执行环境、Eval执行环境。

- 全局执行环境是最外围的一个执行环境。在web浏览器中，全局执行环境被认为是 window 对象，因此所有全局变量和函数都是作为 window 对象的属性和方法创建的。
- 函数执行环境。每个函数都有自己的执行环境，当执行流进入一个函数时，“函数的环境” 就会被推入一个环境栈中。在函数执行完成之后，环境栈会将 “函数的环境” 弹出，把控制权返还给之前的执行环境。
- Eval执行环境，执行eval()函数时创建。

### 执行环境栈

**执行流依次进入的执行环境在逻辑上形成了一个栈**，栈的底部永远是全局执行环境的变量对象，栈的顶部则是当前执行的代码所在环境的变量对象（浏览器总是执行处于栈顶的上下文）。

```js
var a = "global";

function example () {
    console.log(a);   
}

function outer () {
    var b = "outer";
    console.log(b);   

    function inner () {
        var c = "inner";
        console.log(c);
        example();
    }
    inner();
}
outer();复制代码
```

我们可以通过数组的形式表示上面代码的执行环境栈。程序首先进入全局执行环境（GlobalContext），此时环境栈中已经存放了全局执行环境。然后程序依次调用了outer、inner和example函数，每次调函数时都会创建一个函数执行环境放入环境栈中。当前的环境栈存储情况如下：

```js
ECStack = [
    // 栈顶
    example(),
    inner(),
    outer(),
    GlobalContext
    // 栈底
]复制代码
```

个人理解是：环境栈就是用来存储当前程序的执行内容和顺序。

### 作用域链

当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途，是**保证对执行环境有权访问的所有变量和函数的有序访问**。

作用域链的前端始终是当前执行代码的环境的变量对象。如果这个环境是函数，则将函数的活动对象（activition object，AO）作为变量对象。活动对象在最开始时，只包含一个变量，即 arguments 对象（这个对象在全局环境中是不存在的）。

作用域链的末端始终是全局执行环境的变量对象。

所以作用域链中的内容都是变量对象。

那作用域链到底是什么呢？我们先看一个例子：

```js
var color = "blue";

function getColor () {
    return color;
}

console.log(getColor()); // blue复制代码
```

在这个例子中，作用域链从前到后的顺序是：getColor函数的活动对象、全局执行环境的变量对象。

当我们调用 getColor() 时，首先搜索 getColor() 的变量对象，查找名为 color 的标识符，在没有找到的情况下，搜索下一个变量对象（这里就是全局执行环境的变量对象），然后找到了名为 color 的标识符。这个查找链路就是例子中的作用域链，而它的作用也正是 **保证对执行环境有权访问的所有变量和函数的有序访问**。

即：内部环境可以通过作用域链访问所有的外部环境，但是外部环境不能访问内部环境中的任何变量和函数。

### 延长作用域链

虽然执行环节的类型只有：全局和局部（函数）两种，但是可以通过：

- try-catch 语句的 catch 块；
- with 语句

对作用域链进行延长。对 with 语句来说，会将指定的对象添加到作用域链中。对 catch 语句来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明。