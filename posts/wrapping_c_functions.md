---
title: "Wrapping C functions"
description: ""
date: "2025-03-11"
tags: ["c"]
---

Let's say you want to overwrite an API-function located in a library that you don't have any control over or a standard
library function. This is useful when you want to stub that function in some test bench or insert debugging information
in the function itself. To do this, we can make use of C-macros. Let's say we want to overwrite `malloc`. We first
define our own malloc like so:
```c
void* my_malloc( size_t size )
{
  printf("my_malloc");
  return NULL;
}
```
Then we can define the following macro to replace all instances of `malloc` with our newly defined `my_malloc`:

```c
#define malloc my_malloc
```
Compiling and running yields us:
```bash
> clang main.c && ./a.out
my_malloc
```
What if we want to make use of the original `malloc` in our newly created `my_malloc`? This could be problematic as the define replaces all instances of `malloc` with `my_malloc`. So creating a `my_malloc` like this will cause the macro to be recursively executed:
```c
void* my_malloc( size_t size )
{
  printf("my_malloc");
  return malloc(size);
}
```
Compling and running this instead will result in:

```bash
> clang main.c && ./a.out
my_mallocmy_mallocm....y_malloSegmentation fault (core dumped)
```
Where the dots represent `my_malloc` being printed MANY times.

To make this work, we have to place `my_malloc` in a separate source file. Since source files are preprocessed to
translation units along with all the includes and compiled separately from each other, a define in e.g., `main.c` will not affect a wrapper in e.g., `malloc.c`. So we create the following files:

```c
// malloc.c
void* my_malloc(size_t size)
{
  printf("my_malloc");
  return malloc(size);
}
```

```c
// main.c
#define malloc my_malloc

void* my_malloc(size_t size);

int main(int)
{
  void* ptr = malloc(4);
  return 0;
}
```
Now it is possible to compile and execute without all those recursive calls:
```bash
> clang main.c malloc.c && ./a.out
my_malloc
```
We can now wrap the function declaration in a header file and include it wherever we want to
overwrite `malloc`:
```c
// malloc.h
void* my_malloc(size_t size);
```
This is useful. This header file can be included for source files in a test bench to add behavior that we only
want to execute during a test. Thinking more broadly, this could e.g., be us stubbing some API to give as a
behavior or value that we are in control over during a test.