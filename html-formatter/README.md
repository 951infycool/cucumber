# Cucumber HTML Formatter

The Cucumber HTML Formatter renders Cucumber features as HTML. It can optionally include
extra information such as Cucumber results, stack traces, screenshots,
[Gherkin-Lint results](../../gherkin-lint/README.md) or any other information that can be embedded
in the [Cucumber Event Protocol](../../events/README.md).

It is a standalone executable that is designed to be used with any
Cucumber implementation that implements the
[Cucumber Event Protocol](../../events/README.md).

## Implementation

Cucumber HTML Formatter consists of two main components:

* React component (JavaScript)
* Command-line program (JavaScript / Node.js)

We may reimplement the command-line program in Go later, if it makes installation
and cross-platform usage easier. We may also consider packaging the whole thing
as a Docker image.

## Trying it out

Make sure you `cd /cucumber/html-formatter/nodejs` first.

### Writing events to STDIN

    cat example.txt | bin/cucumber-html-formatter

This should print a HTML report to `STDOUT`. You probably want to direct it to a file, then
open it in a browser:

    cat example.txt | bin/cucumber-html-formatter > cucumber.html
    open cucumber.html

### Writing events over a socket

In the first shell:

    bin/cucumber-html-formatter

In the 2nd shell:

    curl --header "Accept: text/event-stream" http://localhost:2222/sse

In the 3rd shell:

    cat example.txt | nc localhost 2223
