//1.类型判断：
//      原始类型：number,string,boolean,null,undefined,symbol，object
//      非原始类型：数组，Tuple元组，enum枚举，never用不存在的值类型,void空，void任意类型，联合类型，函数类型
let number_0x: number = 0x14; //16进制
let number1_0b: number = 0b11010; //2进制
let number1_0o: number = 0x666; //8进制
//undefined,null 与 void的区别：
//     undefined和null是所有类型的子类；undefined和null 可以给其他类型赋值，
//      void类型可以也紧使用undefined和null值。
let unde: void = undefined;
let un: void = null;

function Hello(name: string): void {
    console.log(name)
}

Hello('zhangsan')

let list_array: number[] = [1, 2, 3]; //普通方式
let list_array2: Array<number> = [1, 2, 3];//泛型方式
let x: [number, string] = [1, '12'] //元组：允许表示一个已知元素数量和类型的数组
// const rat: number = 10000; //TypeScript 支持数字的和基于字符串的枚举
//const cattle: number = 20000;//TypeScript 支持数字的和基于字符串的枚举
enum ChineseZodiac {
    rat,
    cattle,
    tiger,
    rabbit,
    dragon,
}    //数字枚举
console.log(ChineseZodiac.rat, ChineseZodiac[0])

enum Person {
    name = "NAME",
    age = "AGE",
    love = "LOVE",
    hobby = "HOBBY",
}  //字符串枚举
console.log(Person.name); // NAME
console.log(Person.hobby); // HOBBY
function error(message: string): never {
    throw new Error(message);
}  //never 类型是任何类型的子类型，也可以赋值给任何类型，一般作为函数返回值
let notSure: any = 4;  //任意类型   与void没有类型相反

let uni_type: string | number = 12;  //可以是多种类型的一种
uni_type = 'zhangsan'

declare function create(o: object | null): void; //object是指非原始类型

//结构
function ll(o: { a: string, b?: number }) {
    let {a, b = 100} = o
}

type C = { a: string, b: number }

function ppp(mm: C) {
    console.log(mm)
}


//2.接口：

interface People {
    name: string,
    age: number
}

function say(people: People) {
    console.log(`${people.name}说:他${people.age}岁了`)
}

let man: People = {
    name: '小王',
    age: 1,
}
say(man)

// 1)中的函数类型
interface Find {
    (userId: string): boolean
}

let findUser: Find = function (userId: string): boolean {
    //...
    return true
}
console.log(findUser('22'))

//2)可索引的类型
interface StringArray {
    [index: number]: string
}

let myArray: StringArray = ['100', '200'];
let n1: string = myArray[0];

//3)readonly  只读
interface Point {
    readonly x: number
    readonly y: number
}

let myPoint: Point = {x: 100, y: 200};
// myPoint.x=2222;  //readonly 不能改变值
let userList: ReadonlyArray<string> = ['1']
//ReadonlyArray  只读数组


//4)类类型接口
interface clockInterface {
    currentTime: Date;

    setTime(d: Date): void;
}

class Clock implements clockInterface {
    currentTime: Date;

    setTime(d: Date): void {
        this.currentTime = d;
    }

    constructor(h: number, m: number) {
        this.currentTime == new Date()
    }
}


//5)构造器接口
interface OpInterface {
    //类的实例接口;这个接口中有一个函数op，op有两个参数返回一个number
    op(a: number, b: number): number
}

interface OpConstructor {
    //类的静态接口;构造函数的方法值设定为类类型主体类型, 这个构造函数接收两个参数，返回OpInterface类型
    new(a: number, b: number): OpInterface
}

function CreateOp(ctor: OpConstructor, a: number, b: number): OpInterface {
    return new ctor(a, b)
}

class Op1 implements OpInterface {
    constructor(a: number, b: number) {

    }

    op(a: number, b: number): number {
        return a - b
    }
}

class Op2 implements OpInterface {
    constructor(a: number, b: number) {

    }

    op(a: number, b: number): number {
        return a + b
    }
}

let op1 = CreateOp(Op1, 12, 17);
let op2 = CreateOp(Op2, 10, 17);
console.dir(op1, op2)


//6)接口继承
interface Shape {
    color: string
}

interface Width {
    width: string
}

interface Square extends Shape, Width {
    border: string
}

// 下面有两种写法；
let square = {} as Square;
// let square =<Square>{}
square.color = 'blur';
// square.ss = '111';   不通过语法
square.width = '11';
square.border = '100';
console.log(square)

//7）混合类型

interface Counter {
    (start: number): string

    interval: number

    reset(): void
}

function getCounter(): Counter {
    // let counter =<Counter>(start => console.log(start))   //两种写法
    let counter = ((start: number) => {
        console.log(start)
    }) as Counter;
    counter.interval = 666;
    counter.reset = function (): void {
        console.log('我是reset')
    }
    return counter
}

let mycounter = getCounter();
mycounter(8);
mycounter.reset();
mycounter.interval = 20;
console.log(mycounter)


//类相关

//1）抽象类
abstract class Human {
    name: string

    constructor(name: string) {
        this.name = name
    }

    printName(): void {
        console.log(this.name)
    }

    //抽象类可以不用实现，可以有子对象实现
    abstract sayHello(): void
}

class Student extends Human {
    constructor(name: string) {
        super(name)
    }

    sayHello(): void {
        console.log('大家好~~')
    }

    readBook(): void {
        console.log('我在读数~~')
    }
}

let student: Human = new Student('laowang');
student.sayHello()
//student.readBook();  指定了类后类里面没有的不能通过

//2）this相关 1
let randomPoint2 = {
    nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    createNum: function () {
        console.log(this)
        return () => {
            let rand = Math.floor(Math.random() * 10)
            console.log(rand)
            return {
                num: this.nums[rand]
            }
        }
    }
}
let getNum2 = randomPoint2.createNum();
let num2 = getNum2();  //箭头函数的this创建是就已经保存了
console.log(num2['num'])

//this相关 2 指定this类型，用于检测this类型，但是无法改变this指向

interface MyNum {
    num: number
}

interface RandomPoint {
    nums: number[],

    createNum(this: RandomPoint): () => MyNum
}

let randomPoint3 = {
    nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    createNum: function (this: RandomPoint) {
        console.log(this)
        return () => {
            let rand = Math.floor(Math.random() * 10)
            console.log(rand, 'Point3')
            return {
                num: this.nums[rand]
            }
        }
    }
}
let getNum3 = randomPoint3.createNum();
let num3 = getNum3();  //箭头函数的this创建是就已经保存了
console.log(num3['num'])

//this相关 3 在回调函数中使用
interface UIController {
    addClickListener(onclick: (this: void, e: Event, b: MyNum) => void): void
}

class Handler {
    type: string
    onClickCool = (e: Event, b: MyNum) => {
        console.log(b)
        //this 是定义时候的Handler
        this.type = e.type
    }
}

let h = new Handler()
let uiController: UIController = {
    addClickListener() {
        console.log(this)
    }
}
uiController.addClickListener(h.onClickCool)


//3)重载  两个一样的函数 通不过语法检查，
class xxx {
    // getUserInfo(name:string):void{
    //     console.log(name,'我是name')
    // }
    // getUserInfo(id:number):void{
    //     console.log(id,'我是id')
    // }
    getUserInfo(str: any): void {
        if (typeof str === 'string') {
            console.log(str, 'woshi string')
        }
        if (typeof str === 'number') {
            console.log(str, 'woshi number')
        }
    }
}


//泛型  我们把要传入函数的参数类型设为一个类型变量 T ，
// 它能够帮助我们捕获用户传入的类型，之后出现 T 的地方，都会被替换成用户传入的类型

function Go<T>(who: T): T {
    return who
}

let result = Go<string>('老王');
let result1 = Go<number>(123);
let result2 = Go(123)  //类型推断


//  ---------------------- start知识----------------
// 泛型函数 知识  <泛型变量名称>(参数1: 泛型变量, 参数2: 泛型变量, ...参数n: 泛型变量) => 泛型变量
//1）可以以对象字面量的形式来定义泛型函数（这更像是接口），
// let foo:{<T>(arg:T):void};
// foo = function <T>(arg:T):void{
//  console.log(arg)
// }
// foo(13)
// 将上面的例子中的{ <T>(arg: T): void } 改为接口：


interface IGeneric {
    <T>(arg: T): void
}

let foo: IGeneric = function <T>(arg: T): void {
    console.log(arg)
}

//接口也可以使用泛型
interface Generic<T> {
    (arg: T): void
}

function fn<T>(arg: T): void {
    console.log(arg)
}

let myFn: Generic<number> = fn;

//注意泛型 和 泛型接口的区别
// --------------------end知识---------------


function Log<T>(msg: T): T {
    return msg
}

//使用变量接收泛型
// let myLog:<T>(msg:T) =>T = Log ;  //规范写法
let myLog: { <U>(msg: U): U } = Log      //另一种写法
// let myLog = Log;   //推导写法
console.log(myLog)

// 接口泛型
interface FnInterface<T> {
    <T>(msg: T): T
}

let mylog2: FnInterface<string> = Log;
console.log(mylog2)


// 泛型类
class Make<T> {
    defaultValue: T
    do: (a: T, b: T) => T
}

let v: Make<string> = new Make();
v.defaultValue = "10";
v.do = function (a, b) {
    return a + b
}
v.do('10', "20")

//泛型约束
interface maxLength {
    max: number
}

//extends 对T进行扩展，看看 T中是否有max这个属性
function LogS<T extends maxLength>(msg: T): T {
    return msg
}

LogS({max: 666})

function getAttribute<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

let xx1 = {a: 1, b: "w", c: 3};
getAttribute(xx1, 'c')
// getAttribute(xx1,'m') //报错


// 抽象类泛型
abstract class Car {
    public abstract MakeCar()
}

class BmwFactory extends Car {
    MakeCar(): string {
        return 'BMW'
    }
}

class BenzFactory extends Car {
    MakeCar(): string {
        return 'Benz'
    }
}

function createFactory<T extends Car>(c: new() => T): T {
    return new c()
}

console.log(createFactory(BmwFactory).MakeCar())
console.log(createFactory(BenzFactory).MakeCar())


//类型推断
let x2 = 3;

class Car2 {
}

class BMW2 extends Car2 {
}

class Ben2 extends Car2 {
}

function buyCar(): Car2[] {
    return [new BMW2(), new Ben2()]
}

//交叉类型
function crossType<T,U>(one:T,two:U):T&U{
    let r= {} as T&U;
    for(let prop in one){
        r[prop] = one[prop] as any
    }

    for (let prop in two){
        if(!r.hasOwnProperty(prop)){
            r[prop] = two[prop] as any
        }
    }
    return r
}

class Person2 {
    name:string
    constructor(name:string){
        this.name=name
    }
}
interface CanAble{
    Happy():void
    Work():void
}

class Man2 implements CanAble{
    Happy(): void {
        console.log("赵小姐姐");
    }
    Work(): void {
        console.log("家里有矿");
    }
}
class Woman2 implements CanAble{
    Happy(): void {
        console.log("买买买");
    }
    Work(): void {
        console.log("有人养，不上班");
    }
}

let m = crossType(new Person2('老王'),new Man2())
m.Work()
m.Happy()

let w = crossType(new Person2('老王媳妇'),new Woman2())
w.Work()
w.Happy()



//联合类型
function joinType(x: number, y: number): string | number {
    // return ''
    return 1
}

//类型保护    //注意is和as的用法
interface Wolf {
    hunt()

    eat()
}

interface Buffalo {
    eat()
}

class Wolf implements Wolf {
    hunt() {
        console.log('我去捕猎')
    }

    eat() {
        console.log('我去吃东西')
    }
}

class Buffalo implements Buffalo {
    eat() {
        console.log('我去吃草')
    }
}

function getAnimal(): Wolf | Buffalo {
    return Math.random() * 100 > 80 ? new Wolf() : new Buffalo()
}
let animal = getAnimal()

console.log(animal)
//第一种使用谓词
if (isWolf(animal)) {
    animal.hunt();
}
//谓词 is
function isWolf(animal: Wolf | Buffalo):animal is Wolf {
    return (animal as Wolf).hunt !==undefined
}


//第二种 使用instanceof
if (animal instanceof Wolf) {
    animal.hunt();
}
