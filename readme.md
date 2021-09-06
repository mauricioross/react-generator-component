# rng-cli
A simple cli for react js
---

## Installation

This package is available on [npm](http://npmjs.com) as `rng-cli`.

``` sh
npm install rng-cli -g
```

## Features
<h4>version 1.0.3</h4>
<ul>
    <li>Add argument <b>--stories</b> : create file for Storybook</li>
</ul>

## Description

- You can create React js components with the following characteristics:
<h4>
folderComponent
</h4>
<ul>
<li>component.js</li>
<li>component.scss</li>
<li>component.test.js</li>
<li>component.stories.js</li>
</ul>
<h4>
Description of each file:
</h4>
<ul>
<li><b> component.js:</b> This file contains the component with an initial code.</li>
<li><b>component.scss:</b>  This file contains the sass styles, with breakpoints for the different devices.</li>
<li><b>component.test.js:</b>  This File contains a basic Test example for the component.</li>
<li><b>component.stories.js:</b>  This file contains a basic example of a stories for Storybook.</li>
</ul>


## How to use

To use this component in its current version 1.0.3, follow the instructions below:
<ul>
<li>Go to the component containing folder using Terminal or Cmd.</li>
<li>To create a page, enter the console : rng-cli --n 'pagename' --type 'indexPage'</li>
<li>To create a component, enter the console : rng-cli --n 'componentname' --type 'button'</li>
<li>To create a component with stories, enter the console : rng-cli --n 'componentname' --type 'button' --stories true</li>
<li>Verify that both the folder and the files have been generated.</li>
</ul>

## Options

<b>--n </b> : Name of component.
<b>--stories</b> :Generate file for stories.
