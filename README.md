# KatsuJS

A reactive, directive-based library for creating User Interfaces.

KatsuJS is the go-to solution for creating fully functional UI components in short-time, by using an minimal coding and vast array of built-in directives.

Rather than competing to be the smallest UI library, KatsuJs focuses on offering the best tools to create awesome User Interfaces!


This library is currently in Beta/Development stage and may contain error that are currently being address



```javascript
// Basic Component

const app = new Blade();

class Hello{
  view(){
    return `
      <h1>{{message}}</h1>
    `
  }
  data(){
    return {
      message: 'Hello World'
    }
  }
}

app.module(Hello);

app.render('Hello', '#root')

```



```javascript
// Functional Component

class Hello{
  view(){
    return `
      <h1>{{message}}</h1>
    `
  }
  controller($data){
    $data.message = 'Hello World'
  }
}

```
