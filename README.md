github-token-exchanger
==================

Exchanges the auth code from the GitHub API for a token.

Installation
------------

Clone this repo.

Usage
-----

    node start-github-token-exchanger.js

For testing purposes, you can get a Github auth code by running:

    CLIENTID=<your GitHub client id> make get-code

Then, pulling the GitHub auth code from the `code` param in the redirect URL in your browser.

With that, you can hit the `exchange` endpoint like so:

    curl http://localhost:5876/exchange?code=<your Github auth code>

Deploy:

    make initial-setup

Subsequent deploys:

    make pushall

License
-------

The MIT License (MIT)

Copyright (c) 2017 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
