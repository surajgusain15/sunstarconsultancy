---
title: "Go Concurrency Patterns"
slug: "go-concurrency-patterns"
excerpt: "From goroutines to pipelines — mastering concurrency in Go for production systems."
category: "Go"
tags: ["Go", "Concurrency", "Goroutines", "Channels"]
date: "Apr 28, 2026"
readTime: "12 min read"
author: "SUNSTAR Engineering Team"
---

## Understanding Goroutines

Goroutines are lightweight threads managed by the Go runtime. They start with only 2KB of stack space, making it feasible to run thousands concurrently.

## Channel Patterns

### Fan-Out, Fan-In
Distribute work across multiple goroutines and collect results:

```go
func fanOut(in <-chan int, workers int) []<-chan int {
    channels := make([]<-chan int, workers)
    for i := 0; i < workers; i++ {
        channels[i] = worker(in)
    }
    return channels
}

func fanIn(channels []<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    for _, c := range channels {
        wg.Add(1)
        go func(ch <-chan int) {
            defer wg.Done()
            for v := range ch {
                out <- v
            }
        }(c)
    }
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}
```

### Pipeline Pattern
Chain stages connected by channels:

```go
func pipeline(done <-chan struct{}, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case out <- n:
            case <-done:
                return
            }
        }
    }()
    return out
}
```

## Error Handling

Use a result type to combine values with errors in concurrent operations:

```go
type Result struct {
    Value interface{}
    Err   error
}
```

## Context Propagation

Always pass context through your concurrent pipelines to enable cancellation and deadlines.

## Conclusion

Mastering these concurrency patterns is essential for building robust, scalable Go applications.
