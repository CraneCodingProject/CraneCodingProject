/* --- Swelen Swelty 1.6 --- */
(function () { var b = function () { }, c, e, f = window, h = document, j = !!h.getElementsByClassName, o = !!h.querySelectorAll, n = [], k = function (a) { return !/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(a.replace(/"(\\.|[^"\\])*"/g, "")) && eval("(" + a + ")") }, p = function () { if (f.XMLHttpRequest && !f.ActiveXObject) try { return new XMLHttpRequest } catch (a) { } try { return new ActiveXObject("MSXML3.XMLHTTP") } catch (d) { } try { return new ActiveXObject("MSXML2.XMLHTTP.6.0") } catch (l) { } try { return new ActiveXObject("MSXML2.XMLHTTP.3.0") } catch (i) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (b) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (g) { } throw Error("xhr failed"); }; b.extend = function (a, d) { var l = b.prototype.extend, i = new this, c = i.constructor; b._prototyping = !0; l.call(i, a); i.parent = function () { }; delete b._prototyping; var g = i.constructor = function () { if (!b._prototyping) if (this._constructing || this.constructor === g) this._constructing = !0, c.apply(this, arguments), delete this._constructing; else if (arguments[0] !== null) return (arguments[0].extend || l).call(arguments[0], i) }; g.ancestor = this; g.extend = this.extend; g.forEach = this.forEach; g.implement = this.implement; g.prototype = i; g.toString = this.toString; g.valueOf = function (a) { return a === "object" ? g : c.valueOf() }; l.call(g, d); typeof g.init === "function" && g.init(); return g }; b.prototype = { extend: function (a, d) { if (arguments.length > 1) { var l = this[a]; if (l && typeof d === "function" && (!l.valueOf || l.valueOf() !== d.valueOf()) && /\bparent\b/.test(d)) { var i = d.valueOf(), d = function () { var a = this.parent || b.prototype.parent; this.parent = l; var d = i.apply(this, arguments); this.parent = a; return d }; d.valueOf = function (a) { return a === "object" ? d : i }; d.toString = b.toString } this[a] = d } else if (a) { var c = b.prototype.extend; !b._prototyping && typeof this !== "function" && (c = this.extend || c); for (var g = { toSource: null }, e = ["constructor", "toString", "valueOf"], f = b._prototyping ? 0 : 1; h = e[f++];) a[h] !== g[h] && c.call(this, h, a[h]); for (var h in a) g[h] || c.call(this, h, a[h]) } return this } }; b = b.extend({ constructor: function (a) { this.extend(a) } }, { ancestor: Object, forEach: function (a, d, c) { for (var i in a) this.prototype[i] === void 0 && d.call(c, a[i], i, a) }, implement: function (a) { this.prototype.extend(a); return this }, toString: function () { return String(this.valueOf()) } }); Array.prototype.makenative = function () { for (var a in this[0]) this[0][a].implement = function (a) { for (var c in a) this.prototype[c] = a[c] } };[{ Array: Array, Date: Date, Function: Function, Number: Number, RegExp: RegExp, String: String }].makenative(); Array.implement({ each: function (a, d) { for (var c = 0, i = this.length; c < i; c++) a.call(d, this[c], c, this) } }); f.Class = function (a) { return a.Extends ? a.Extends.extend(a) : b.extend(a) }; f.getCSSPixelStyle = function (a, d) { if (a.currentStyle) { var c = a.currentStyle[d] || 0, i = a.style.left, b = a.runtimeStyle.left; a.runtimeStyle.left = a.currentStyle.left; a.style.left = d === "fontSize" ? "1em" : c; c = a.style.pixelLeft + "px"; a.style.left = i; a.runtimeStyle.left = b; return c } else return getComputedStyle(a, null)[d] }; var m = new Class({ constructor: function () { }, each: function (a) { for (var d = 0; d < this.length; d++) a.apply(this[d], []); return this }, on: function (a, d) { return this.each(function () { c.attach(this, a, d) }) }, html: function (a) { if (a) return this.each(function () { this.innerHTML = a }); else { var d = []; this.each(function () { d.push(this.innerHTML) }); return d } }, show: function () { return this.each(function () { this.style.display = "block" }) }, hide: function () { return this.each(function () { this.style.display = "none" }) }, click: function (a) { return this.each(function () { c.attach(this, "click", a) }) }, toggle: function (a, d) { var b = this; return b.each(function () { c.attach(this, "click", function () { c.togs[b] ? c.togs[b] === !0 && (c.togs[b] = !1, d.apply(this, [])) : (c.togs[b] = !0, a.apply(this, [])) }) }) }, hover: function (a, d) { return this.each(function () { c.attach(this, "mouseover", a); d && c.attach(this, "mouseout", d) }) } }); e = function (a, d, b) { var i = typeof a, e = new m, d = i === "string" ? c(a, d, b) : i === "object" ? a : {}; if (i === "function") return c.attach(window, "load", a); for (var g in e) d[g] = e[g]; return d }; e.implement = function (a) { m.implement(a) }; e.jsonp = { url: "", lastInserted: !1, request: function (a) { this.url = a; this.lastInserted !== !1 && e("head")[0].removeChild(this.lastInserted); this.lastInserted = this.get(this.url) }, get: function (a) { var d = h.createElement("script"), c = e("head")[0]; d.setAttribute("charset", "UTF-8"); d.setAttribute("type", "text/javascript"); d.setAttribute("src", a); c.appendChild(d); return d } }; e.get = function (a, d, c, b) { var f = [], g = p(), h; for (h in d) f.push(h + "=" + d[h]); a += "?" + f.join("&"); arguments.length === 2 ? e.jsonp.request(a) : (g.open("GET", a, !0), g.setRequestHeader("X-Requested-With", "XMLHttpRequest"), g.onreadystatechange = function () { g.readyState === 4 && g.status === 200 && c(b === !0 ? k(g.responseText) : g.responseText) }, g.send(null)) }; c = function (a, d, c) { if (n[a] && !c && !d) return n[a]; var d = d || h, b = [], e = 0; if (/^[\w[:#.][\w\]*^|=!]*$/.test(a)) switch (a.charAt(0)) { case "#": e = a.slice(1); b = h.getElementById(e); h.all && b.id !== e && (b = h.all[e]); b = b ? [b] : []; break; case ".": var g = a.slice(1); if (j) b = (b = d.getElementsByClassName(g)).length ? b : []; else { for (var g = " " + g + " ", f = d.getElementsByTagName("*"), k = 0, m; m = f[k++];) (" " + m.className + " ").indexOf(g) != -1 && (b[e++] = m); b = e ? b : [] } break; default: b = (b = d.getElementsByTagName(a)).length ? b : [] } else o && (b = d.querySelectorAll(a)); return c || d ? b : n[a] = b }; c.togs = []; c.attach = function (a, b, e) { var f, h = function (a) { c.bind(a, this, e) }; a.addEventListener ? a.addEventListener(b, h, !1) : a.attachEvent ? (a._cb = function (a) { c.bind(a, event.srcElement, e) }, a.attachEvent("on" + b, a._cb)) : typeof a["on" + b] === "function" ? (f = a["on" + b], a["on" + b] = function (b) { c.bind(b, a, e); f() }) : a["on" + b] = h; return a }; c.bind = function (a, b, c) { var a = a ? a : window.event, e = a.charCode || !1, f = a.keyCode || !1, g = a.which || !1; c.apply(b, [{ e: a, key: e ? e : f ? f : g ? g : 0 }]) }; f.$z = c; f.$w = e })(); Array.implement({ each: function (b, c) { for (var e = 0, f = this.length; e < f; e++) b.call(c, this[e], e, this) }, filter: function (b, c) { for (var e = [], f = 0, h = this.length; f < h; f++) b.call(c, this[f], f, this) && e.push(this[f]); return e }, indexOf: function (b, c) { for (var e = this.length, f = c < 0 ? Math.max(0, e + c) : c || 0; f < e; f++) if (this[f] === b) return f; return -1 }, map: function (b, c) { for (var e = [], f = 0, h = this.length; f < h; f++) e[f] = b.call(c, this[f], f, this); return e } }); $w.implement({ css: function () { var b = arguments, c = b.length; return c === 2 && typeof b[0] === "string" ? this.each(function () { this.style[b[0]] = b[1] }) : c === 1 && typeof b[0] === "object" ? this.each(function () { for (var c in b[0]) this.style[c] = b[0][c] }) : this }, animate: function () { var b = arguments, c = b.length, e = 0, f = {}; return (c === 2 || c === 3) && typeof b[0] === "object" ? (e = Math.min(2E4, b[1]), f = b[2] || function () { }, this.each(function () { var c = b[0], j; for (j in c) { var o = this.style, n = 0, k = 0, p = 0, m = 0, a = c[j].toString().match(/^([+-]=)?([\d+-.]+)(.*)$/), n = parseFloat(getCSSPixelStyle(this, j)); o[j] = getCSSPixelStyle(this, j); a && (k = parseFloat(a[2]), a[1] && (k = (a[1] === "-=" ? -1 : 1) * k + n)); var p = -10 * (n - k) / e, d = setInterval(function () { o[j] = parseFloat(o[j]) + parseFloat(p) + "px"; m += 10; if (m > e) return o[j] = k + "px", clearInterval(d), f(), delete d, !1 }, 10) } })) : this } }); $w.timeline = function (b) { for (var c in b) window.setTimeout(b[c], c) };
/* --- Swelen Swelty 1.6 --- */


/*
Based on excellent JSBeautifier of Einar Lielmanis from http://jsbeautifier.org/
*/

function escapeHTML(string) {
    var pre = document.createElement('pre');
    var text = document.createTextNode(string);
    pre.appendChild(text);
    return pre.innerHTML;
}

function js_beautify(js_source_text, options) {
    var input, output, token_text, last_type, last_text, last_last_text, last_last_last_text, last_word, flags, flag_store, indent_string;
    var whitespace, wordchar, punct, parser_pos, line_starters, digits;
    var prefix, token_type, do_block_just_closed;
    var wanted_newline, just_added_newline, n_newlines;
    // Some interpreters have unexpected results with foo = baz || bar;
    options = options ? options : {};
    var opt_braces_on_own_line = options.braces_on_own_line ? options.braces_on_own_line : false;
    var opt_indent_size = options.indent_size ? options.indent_size : 4;
    var opt_indent_char = options.indent_char ? options.indent_char : ' ';
    var opt_preserve_newlines = typeof options.preserve_newlines === 'undefined' ? true : options.preserve_newlines;
    var opt_max_preserve_newlines = typeof options.max_preserve_newlines === 'undefined' ? false : options.max_preserve_newlines;
    var opt_indent_level = options.indent_level ? options.indent_level : 0; // starting indentation
    var opt_space_after_anon_function = options.space_after_anon_function === 'undefined' ? false : options.space_after_anon_function;
    var opt_keep_array_indentation = typeof options.keep_array_indentation === 'undefined' ? false : options.keep_array_indentation;
    just_added_newline = false;
    // cache the source's length.
    var input_length = js_source_text.length;
    function trim_output(eat_newlines) {
        eat_newlines = typeof eat_newlines === 'undefined' ? false : eat_newlines;
        while (output.length && (output[output.length - 1] === ' ' || output[output.length - 1] === indent_string || (eat_newlines && (output[output.length - 1] === '\n' || output[output.length - 1] === '\r')))) {
            output.pop();
        }
    }
    function is_array(mode) {
        return mode === '[EXPRESSION]' || mode === '[INDENTED-EXPRESSION]';
    }
    function trim(s) {
        return s.replace(/^\s\s*|\s\s*$/, '');
    }
    function print_newline(ignore_repeated) {
        flags.eat_next_space = false;
        if (opt_keep_array_indentation && is_array(flags.mode)) {
            return;
        }
        ignore_repeated = typeof ignore_repeated === 'undefined' ? true : ignore_repeated;
        flags.if_line = false;
        trim_output();
        if (!output.length) {
            return; // no newline on start of file
        }
        if (output[output.length - 1] !== "\n" || !ignore_repeated) {
            just_added_newline = true;
            output.push("\n");
        }
        for (var i = 0; i < flags.indentation_level; i += 1) {
            output.push(indent_string);
        }
        if (flags.var_line && flags.var_line_reindented) {
            if (opt_indent_char === ' ') {
                output.push('    '); // var_line always pushes 4 spaces, so that the variables would be one under another
            } else {
                output.push(indent_string); // skip space-stuffing, if indenting with a tab
            }
        }
    }

    function print_newlineforce() {
        flags.eat_next_space = false;
        output.push("\n");
        for (var i = 0; i < flags.indentation_level; i += 1) {
            output.push(indent_string);
        }
        if (flags.var_line && flags.var_line_reindented) {
            if (opt_indent_char === ' ') {
                output.push('    '); // var_line always pushes 4 spaces, so that the variables would be one under another
            } else {
                output.push(indent_string); // skip space-stuffing, if indenting with a tab
            }
        }
    }


    function print_single_space() {
        if (flags.eat_next_space) {
            flags.eat_next_space = false;
            return;
        }
        var last_output = ' ';
        if (output.length) {
            last_output = output[output.length - 1];
        }
        if (last_output !== ' ' && last_output !== '\n' && last_output !== indent_string) { // prevent occassional duplicate space
            output.push(' ');
        }
    }

    function isNumeric(input) {
        return (input - 0) == input && input.length > 0;
    }


    var __keywords = ('var function if else for while break switch case do new null in with void continue delete return this true false throw try catch typeof with instanceof').split(' '),
		__special = ('eval window document undefined NaN Infinity parseInt parseFloat encodeURI decodeURI encodeURIComponent decodeURIComponent').split(' ');


    function print_token() {
        var rx = '';
        // mod by vince
        just_added_newline = false;
        flags.eat_next_space = false;

        if (in_array(token_text, __keywords)) {
            rx = '<span class="keyword">' + token_text + '</span>';
        } else if (in_array(token_text, __special)) {
            rx = '<span class="special">' + token_text + '</span>';
        } else if (isNumeric(token_text)) {
            rx = '<span class="number">' + token_text + '</span>';
        } else {
            rx = escapeHTML(token_text);
        }

        output.push(rx);
    }

    // added by vince
    function print_comment() {
        var rx = escapeHTML(token_text); // added by vince
        just_added_newline = false;
        flags.eat_next_space = false;
        rx = '<span class="comment">' + rx + '</span>';
        output.push(rx);
    }
    function print_escape(what) {
        var rx = escapeHTML(token_text); // added by vince
        just_added_newline = false;
        flags.eat_next_space = false;
        rx = '<span class="' + what + '">' + rx + '</span>';
        output.push(rx);
    }
    function print_fast(what) {
        just_added_newline = false;
        flags.eat_next_space = false;
        output.push('<span class="' + what + '">' + token_text + '</span>');
    }
    function print_ultrafast(what) {
        just_added_newline = false;
        flags.eat_next_space = false;
        output.push(token_text);
    }

    function indent() {
        flags.indentation_level += 1;
    }
    function remove_indent() {
        if (output.length && output[output.length - 1] === indent_string) {
            output.pop();
        }
    }
    function set_mode(mode) {
        if (flags) {
            flag_store.push(flags);
        }
        flags = {
            previous_mode: flags ? flags.mode : 'BLOCK',
            mode: mode,
            var_line: false,
            var_line_tainted: false,
            var_line_reindented: false,
            in_html_comment: false,
            if_line: false,
            in_case: false,
            eat_next_space: false,
            indentation_baseline: -1,
            indentation_level: (flags ? flags.indentation_level + ((flags.var_line && flags.var_line_reindented) ? 1 : 0) : opt_indent_level)
        };
    }
    function is_array(mode) {
        return mode === '[EXPRESSION]' || mode === '[INDENTED-EXPRESSION]';
    }
    function is_expression(mode) {
        return mode === '[EXPRESSION]' || mode === '[INDENTED-EXPRESSION]' || mode === '(EXPRESSION)';
    }
    function restore_mode() {
        do_block_just_closed = flags.mode === 'DO_BLOCK';
        if (flag_store.length > 0) {
            flags = flag_store.pop();
        }
    }
    function in_array(what, arr) {
        for (var i = 0; i < arr.length; i += 1) {
            if (arr[i] === what) {
                return true;
            }
        }
        return false;
    }
    // Walk backwards from the colon to find a '?' (colon is part of a ternary op)
    // or a '{' (colon is part of a class literal).  Along the way, keep track of
    // the blocks and expressions we pass so we only trigger on those chars in our
    // own level, and keep track of the colons so we only trigger on the matching '?'.
    function is_ternary_op() {
        var level = 0,
			colon_count = 0;
        for (var i = output.length - 1; i >= 0; i--) {
            switch (output[i]) {
                case ':':
                    if (level === 0) {
                        colon_count++;
                    }
                    break;
                case '?':
                    if (level === 0) {
                        if (colon_count === 0) {
                            return true;
                        } else {
                            colon_count--;
                        }
                    }
                    break;
                case '{':
                    if (level === 0) {
                        return false;
                    }
                    level--;
                    break;
                case '(':
                case '[':
                    level--;
                    break;
                case ')':
                case ']':
                case '}':
                    level++;
                    break;
            }
        }
    }
    function get_next_token() {
        n_newlines = 0;
        if (parser_pos >= input_length) {
            return ['', 'TK_EOF'];
        }
        wanted_newline = false;
        var c = input.charAt(parser_pos);
        parser_pos += 1;
        var keep_whitespace = opt_keep_array_indentation && is_array(flags.mode);
        if (keep_whitespace) {
            //
            // slight mess to allow nice preservation of array indentation and reindent that correctly
            // first time when we get to the arrays:
            // var a = [
            // ....'something'
            // we make note of whitespace_count = 4 into flags.indentation_baseline
            // so we know that 4 whitespaces in original source match indent_level of reindented source
            //
            // and afterwards, when we get to
            //    'something,
            // .......'something else'
            // we know that this should be indented to indent_level + (7 - indentation_baseline) spaces
            //
            var whitespace_count = 0;
            while (in_array(c, whitespace)) {
                if (c === "\n") {
                    trim_output();
                    output.push("\n");
                    just_added_newline = true;
                    whitespace_count = 0;
                } else {
                    if (c === '\t') {
                        whitespace_count += 4;
                    } else if (c === '\r') {
                        // nothing
                    } else {
                        whitespace_count += 1;
                    }
                }
                if (parser_pos >= input_length) {
                    return ['', 'TK_EOF'];
                }
                c = input.charAt(parser_pos);
                parser_pos += 1;
            }
            if (flags.indentation_baseline === -1) {
                flags.indentation_baseline = whitespace_count;
            }
            if (just_added_newline) {
                var i;
                for (i = 0; i < flags.indentation_level + 1; i += 1) {
                    output.push(indent_string);
                }
                if (flags.indentation_baseline !== -1) {
                    for (i = 0; i < whitespace_count - flags.indentation_baseline; i++) {
                        output.push(' ');
                    }
                }
            }
        } else {
            while (in_array(c, whitespace)) {
                if (c === "\n") {
                    n_newlines += ((opt_max_preserve_newlines) ? (n_newlines <= opt_max_preserve_newlines) ? 1 : 0 : 1);
                }
                if (parser_pos >= input_length) {
                    return ['', 'TK_EOF'];
                }
                c = input.charAt(parser_pos);
                parser_pos += 1;
            }
            if (opt_preserve_newlines) {
                if (n_newlines > 1) {
                    for (i = 0; i < n_newlines; i += 1) {
                        print_newline(i === 0);
                        just_added_newline = true;
                    }
                }
            }
            wanted_newline = n_newlines > 0;
        }
        if (in_array(c, wordchar)) {
            if (parser_pos < input_length) {
                while (in_array(input.charAt(parser_pos), wordchar)) {
                    c += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos === input_length) {
                        break;
                    }
                }
            }
            // small and surprisingly unugly hack for 1E-10 representation
            if (parser_pos !== input_length && c.match(/^[0-9]+[Ee]$/) && (input.charAt(parser_pos) === '-' || input.charAt(parser_pos) === '+')) {
                var sign = input.charAt(parser_pos);
                parser_pos += 1;
                var t = get_next_token(parser_pos);
                c += sign + t[0];
                return [c, 'TK_WORD'];
            }
            if (c === 'in') { // hack for 'in' operator
                return [c, 'TK_OPERATOR'];
            }
            if (wanted_newline && last_type !== 'TK_OPERATOR' && !flags.if_line && (opt_preserve_newlines || last_text !== 'var')) {
                print_newline();
            }
            return [c, 'TK_WORD'];
        }
        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }
        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }
        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }
        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }
        if (c === ';') {
            return [c, 'TK_SEMICOLON'];
        }
        if (c === '/') {
            var comment = '';
            // peek for comment /* ... */
            var inline_comment = true;
            if (input.charAt(parser_pos) === '*') {
                parser_pos += 1;
                if (parser_pos < input_length) {
                    while (!(input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/') && parser_pos < input_length) {
                        c = input.charAt(parser_pos);
                        comment += c;
                        if (c === '\x0d' || c === '\x0a') {
                            inline_comment = false;
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            break;
                        }
                    }
                }
                parser_pos += 2;
                if (inline_comment) {
                    return ['/*' + comment + '*/', 'TK_INLINE_COMMENT'];
                } else {
                    return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
                }
            }
            // peek for comment // ...
            if (input.charAt(parser_pos) === '/') {
                comment = c;
                while (input.charAt(parser_pos) !== '\r' && input.charAt(parser_pos) !== '\n') {
                    comment += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos >= input_length) {
                        break;
                    }
                }
                parser_pos += 1;
                if (wanted_newline) {
                    print_newline();
                }
                return [comment, 'TK_COMMENT'];
            }
        }
        if (c === "'" || // string
		c === '"' || // string
		(c === '/' && ((last_type === 'TK_WORD' && in_array(last_text, ['return', 'do'])) || (last_type === 'TK_COMMENT' || last_type === 'TK_START_EXPR' || last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_OPERATOR' || last_type === 'TK_EQUALS' || last_type === 'TK_EOF' || last_type === 'TK_SEMICOLON')))) { // regexp
            var sep = c;
            var esc = false;
            var resulting_string = c;
            if (parser_pos < input_length) {
                if (sep === '/') {
                    //
                    // handle regexp separately...
                    //
                    var in_char_class = false;
                    while (esc || in_char_class || input.charAt(parser_pos) !== sep) {
                        resulting_string += input.charAt(parser_pos);
                        if (!esc) {
                            esc = input.charAt(parser_pos) === '\\';
                            if (input.charAt(parser_pos) === '[') {
                                in_char_class = true;
                            } else if (input.charAt(parser_pos) === ']') {
                                in_char_class = false;
                            }
                        } else {
                            esc = false;
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            // incomplete string/rexp when end-of-file reached.
                            // bail out with what had been received so far.
                            return [resulting_string, 'TK_REGEXP'];
                        }
                    }
                } else {
                    //
                    // and handle string also separately
                    //
                    while (esc || input.charAt(parser_pos) !== sep) {
                        resulting_string += input.charAt(parser_pos);
                        if (!esc) {
                            esc = input.charAt(parser_pos) === '\\';
                        } else {
                            esc = false;
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            return [resulting_string, 'TK_STRING'];
                        }
                    }
                }
            }
            parser_pos += 1;
            resulting_string += sep;
            if (sep === '/') {
                // regexps may have modifiers /regexp/MOD , so fetch those, too
                while (parser_pos < input_length && in_array(input.charAt(parser_pos), wordchar)) {
                    resulting_string += input.charAt(parser_pos);
                    parser_pos += 1;
                }
                return [resulting_string, 'TK_REGEXP'];
            } else {
                return [resulting_string, 'TK_STRING'];
            }
        }
        if (c === '#') {
            // Spidermonkey-specific sharp variables for circular references
            // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
            // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
            var sharp = '#';
            if (parser_pos < input_length && in_array(input.charAt(parser_pos), digits)) {
                do {
                    c = input.charAt(parser_pos);
                    sharp += c;
                    parser_pos += 1;
                } while (parser_pos < input_length && c !== '#' && c !== '=');
                if (c === '#') {
                    //
                } else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
                    sharp += '[]';
                    parser_pos += 2;
                } else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
                    sharp += '{}';
                    parser_pos += 2;
                }
                return [sharp, 'TK_WORD'];
            }
        }
        if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
            parser_pos += 3;
            flags.in_html_comment = true;
            return ['<!--', 'TK_COMMENT'];
        }
        if (c === '-' && flags.in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
            flags.in_html_comment = false;
            parser_pos += 2;
            if (wanted_newline) {
                print_newline();
            }
            return ['-->', 'TK_COMMENT'];
        }
        if (in_array(c, punct)) {
            while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
                c += input.charAt(parser_pos);
                parser_pos += 1;
                if (parser_pos >= input_length) {
                    break;
                }
            }
            if (c === '=') {
                return [c, 'TK_EQUALS'];
            } else {
                return [c, 'TK_OPERATOR'];
            }
        }
        return [c, 'TK_UNKNOWN'];
    }
    //----------------------------------
    indent_string = '';
    while (opt_indent_size > 0) {
        indent_string += opt_indent_char;
        opt_indent_size -= 1;
    }
    input = js_source_text;
    last_word = ''; // last 'TK_WORD' passed
    last_type = 'TK_START_EXPR'; // last token type
    last_text = ''; // last token text
    last_last_text = ''; // pre-last token text
    last_last_last_text = ''; // pre-pre-last token text ;-)
    output = [];
    do_block_just_closed = false;
    whitespace = "\n\r\t ".split('');
    wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
    digits = '0123456789'.split('');
    punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::'.split(' ');
    opers = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! ^ ^= |='.split(' ');
    // words which should always start on new line.
    line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');
    // states showing if we are currently in expression (i.e. "if" case) - 'EXPRESSION', or in usual block (like, procedure), 'BLOCK'.
    // some formatting depends on that.
    flag_store = [];
    set_mode('BLOCK');
    parser_pos = 0;
    while (true) {
        var t = get_next_token(parser_pos);
        token_text = t[0];
        token_type = t[1];
        if (token_type === 'TK_EOF') {
            break;
        }
        switch (token_type) {
            case 'TK_START_EXPR':
                if (token_text === '[') {
                    if (last_type === 'TK_WORD' || last_text === ')') {
                        // this is array index specifier, break immediately
                        // a[x], fn()[x]
                        if (in_array(last_text, line_starters)) {
                            print_single_space();
                        }
                        set_mode('(EXPRESSION)');
                        if (__optimizations.colorizeBraces) {
                            print_fast('brace');
                        } else {
                            print_ultrafast('brace');
                        }
                        break;
                    }
                    if (flags.mode === '[EXPRESSION]' || flags.mode === '[INDENTED-EXPRESSION]') {
                        if (last_last_text === ']' && last_text === ',') {
                            // ], [ goes to new line
                            if (flags.mode === '[EXPRESSION]') {
                                flags.mode = '[INDENTED-EXPRESSION]';
                                if (!opt_keep_array_indentation) {
                                    indent();
                                }
                            }
                            set_mode('[EXPRESSION]');
                            if (!opt_keep_array_indentation) {
                                print_newline();
                            }
                        } else if (last_text === '[') {
                            if (flags.mode === '[EXPRESSION]') {
                                flags.mode = '[INDENTED-EXPRESSION]';
                                if (!opt_keep_array_indentation) {
                                    indent();
                                }
                            }
                            set_mode('[EXPRESSION]');
                            if (!opt_keep_array_indentation) {
                                print_newline();
                            }
                        } else {
                            set_mode('[EXPRESSION]');
                        }
                    } else {
                        set_mode('[EXPRESSION]');
                    }
                } else {
                    set_mode('(EXPRESSION)');
                }
                if (last_text === ';' || last_type === 'TK_START_BLOCK') {
                    print_newline();
                } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || last_text === '.') {
                    // do nothing on (( and )( and ][ and ]( and .(
                } else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
                    print_single_space();
                } else if (last_word === 'function') {
                    // function() vs function ()
                    if (opt_space_after_anon_function) {
                        print_single_space();
                    }
                } else if (in_array(last_text, line_starters) || last_text === 'catch') {
                    print_single_space();
                }
                if (__optimizations.colorizeBraces) {
                    print_fast('brace');
                } else {
                    print_ultrafast('brace');
                }
                break;
            case 'TK_END_EXPR':
                if (token_text === ']') {
                    if (opt_keep_array_indentation) {
                        if (last_text === '}') {
                            // trim_output();
                            // print_newline(true);
                            remove_indent();
                            if (__optimizations.colorizeBraces) {
                                print_fast('brace');
                            } else {
                                print_ultrafast('brace');
                            }
                            restore_mode();
                            break;
                        }
                    } else {
                        if (flags.mode === '[INDENTED-EXPRESSION]') {
                            if (last_text === ']') {
                                restore_mode();
                                print_newline();
                                if (__optimizations.colorizeBraces) {
                                    print_fast('brace');
                                } else {
                                    print_ultrafast('brace');
                                }
                                break;
                            }
                        }
                    }
                }
                restore_mode();
                if (__optimizations.colorizeBraces) {
                    print_fast('brace');
                } else {
                    print_ultrafast('brace');
                }
                break;
            case 'TK_START_BLOCK':
                if (last_word === 'do') {
                    set_mode('DO_BLOCK');
                } else {
                    set_mode('BLOCK');
                }
                if (opt_braces_on_own_line) {
                    if (last_type !== 'TK_OPERATOR') {
                        if (last_text == 'return') {
                            print_single_space();
                        } else {
                            print_newline(true);
                        }
                    }
                    if (__optimizations.colorizeBraces) {
                        print_fast('brace');
                    } else {
                        print_ultrafast('brace');
                    }
                    indent();
                } else {
                    if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                        if (last_type === 'TK_START_BLOCK') {
                            print_newline();
                        } else {
                            print_single_space(); // mod by vince: comment this line to get function(){ instead of function() {
                        }
                    } else {
                        // if TK_OPERATOR or TK_START_EXPR
                        if (is_array(flags.previous_mode) && last_text === ',') {
                            print_newline(); // [a, b, c, {
                        }
                    }
                    indent();
                    if (__optimizations.colorizeBraces) {
                        print_fast('brace');
                    } else {
                        print_ultrafast('brace');
                    }
                }
                break;
            case 'TK_END_BLOCK':
                restore_mode();
                if (opt_braces_on_own_line) {
                    print_newline();
                    if (__optimizations.colorizeBraces) {
                        print_fast('brace');
                    } else {
                        print_ultrafast('brace');
                    }
                } else {
                    if (last_type === 'TK_START_BLOCK') {
                        // nothing
                        if (just_added_newline) {
                            remove_indent();
                        } else {
                            // {}
                            trim_output();
                        }
                    } else {
                        if (is_array(flags.mode) && opt_keep_array_indentation) {
                            // we REALLY need a newline here, but newliner would skip that
                            opt_keep_array_indentation = false;
                            print_newline();
                            opt_keep_array_indentation = true;
                        } else {
                            print_newline();
                        }
                    }
                    if (__optimizations.colorizeBraces) {
                        print_fast('brace');
                    } else {
                        print_ultrafast('brace');
                    }
                }
                break;
            case 'TK_WORD':
                // no, it's not you. even I have problems understanding how this works
                // and what does what.
                if (do_block_just_closed) {
                    // do {} ## while ()
                    print_single_space();
                    print_escape('keyword');
                    print_single_space();
                    do_block_just_closed = false;

                    print_newlineforce();

                    break;
                }
                if (token_text === 'function') {
                    if ((just_added_newline || last_text === ';') && last_text !== '{') {
                        // make sure there is a nice clean space of at least one blank line
                        // before a new function definition
                        n_newlines = just_added_newline ? n_newlines : 0;
                        for (var i = 0; i < 2 - n_newlines; i++) {
                            print_newline(false);
                        }
                    }
                }
                if (token_text === 'case' || token_text === 'default') {
                    /*
                    console.log('-------------');
                    console.log('token_text:' + token_text);
                    console.log('token_type:' + token_type);
                    console.log('last_type:' + last_type);
                    console.log('last_text:' + last_text);
                    console.log('last_last_text:' + last_last_text);
                    */

                    if (last_text === '{') {
                        flags.indentation_level++;
                        print_newline();
                    }


                    if (last_type === 'TK_SEMICOLON' && last_last_text === 'break') {
                        print_newlineforce();
                    }

                    if (last_text === ':') {
                        // switch cases following one another
                        remove_indent();
                    } else {
                        // case statement starts in the same line where switch
                        flags.indentation_level--;
                        print_newline();
                        flags.indentation_level++;
                    }
                    print_fast('keyword');
                    flags.in_case = true;
                    break;
                }
                prefix = 'NONE';
                if (last_type === 'TK_END_BLOCK') {
                    if (!in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                        prefix = 'NEWLINE';
                    } else {
                        if (opt_braces_on_own_line) {
                            prefix = 'NEWLINE';
                        } else {
                            prefix = 'SPACE';
                            print_single_space();
                        }
                    }
                } else if (last_type === 'TK_SEMICOLON' && (flags.mode === 'BLOCK' || flags.mode === 'DO_BLOCK')) {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
                    prefix = 'SPACE';
                } else if (last_type === 'TK_STRING' || last_type === 'TK_REGEXP') {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_WORD') {
                    prefix = 'SPACE';
                } else if (last_type === 'TK_START_BLOCK') {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_END_EXPR') {
                    print_single_space();
                    prefix = 'NEWLINE';
                }
                if (flags.if_line && last_type === 'TK_END_EXPR') {
                    flags.if_line = false;
                }

                if (in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                    if (last_type !== 'TK_END_BLOCK' || opt_braces_on_own_line) {
                        print_newline();
                    } else {
                        trim_output(true);
                        print_single_space();
                    }
                } else if (in_array(token_text, line_starters) || prefix === 'NEWLINE') {
                    if ((last_type === 'TK_START_EXPR' || last_text === '=' || last_text === ',') && token_text === 'function') {
                        // no need to force newline on 'function': (function
                        // DONOTHING
                    } else if (last_text === 'return' || last_text === 'throw') {
                        // no newline between 'return nnn'
                        print_single_space();
                    } else if (last_type !== 'TK_END_EXPR') {
                        if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && last_text !== ':') {
                            // no need to force newline on 'var': for (var x = 0...)
                            if (token_text === 'if' && last_word === 'else' && last_text !== '{') {
                                // no newline for } else if {
                                print_single_space();
                            } else {
                                print_newline();

                                if (last_type === 'TK_SEMICOLON' && last_text === ';' && (last_last_text === '}' || (last_last_text === ')' && (last_last_last_text === '}' || last_last_last_text === '(')))) {
                                    print_newlineforce();
                                }
                            }
                        }
                    } else {
                        if (in_array(token_text, line_starters) && last_text !== ')') {
                            print_newline();
                        }
                    }
                } else if (is_array(flags.mode) && last_text === ',' && last_last_text === '}') {
                    print_newline(); // }, in lists get a newline treatment
                } else if (prefix === 'SPACE') {
                    print_single_space();
                }
                print_token();
                last_word = token_text;
                if (token_text === 'var') {
                    flags.var_line = true;
                    flags.var_line_reindented = false;
                    flags.var_line_tainted = false;
                }
                if (token_text === 'if') {
                    flags.if_line = true;
                }
                if (token_text === 'else') {
                    flags.if_line = false;
                }
                break;
            case 'TK_SEMICOLON':
                print_fast('semicolumn');
                flags.var_line = false;
                flags.var_line_reindented = false;
                break;
            case 'TK_STRING':
                if (last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_SEMICOLON') {
                    print_newline();
                } else if (last_type === 'TK_WORD') {
                    print_single_space();
                }
                print_escape('string');
                break;
            case 'TK_REGEXP':
                if (last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_SEMICOLON') {
                    print_newline();
                } else if (last_type === 'TK_WORD') {
                    print_single_space();
                }
                print_escape('regexp');
                break;
            case 'TK_EQUALS':
                if (flags.var_line) {
                    // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
                    flags.var_line_tainted = true;
                }
                print_single_space();
                print_ultrafast('operator');
                print_single_space();
                break;
            case 'TK_OPERATOR':
                var space_before = true;
                var space_after = true;
                if (flags.var_line && token_text === ',' && (is_expression(flags.mode))) {
                    // do not break on comma, for(var a = 1, b = 2)
                    flags.var_line_tainted = false;
                }
                if (flags.var_line) {
                    if (token_text === ',') {
                        if (flags.var_line_tainted) {
                            print_ultrafast('column');
                            flags.var_line_reindented = true;
                            flags.var_line_tainted = false;
                            print_newline();
                            break;
                        } else {
                            flags.var_line_tainted = false;
                        }
                        // } else if (token_text === ':') {
                        // hmm, when does this happen? tests don't catch this
                        // flags.var_line = false;
                    }
                }
                if (last_text === 'return' || last_text === 'throw') {
                    // "return" had a special handling in TK_WORD. Now we need to return the favor
                    print_single_space();
                    print_ultrafast('operator');
                    break;
                }
                if (token_text === ':' && flags.in_case) {
                    print_ultrafast('operator');
                    print_newline();
                    flags.in_case = false;
                    break;
                }
                if (token_text === '::') {
                    // no spaces around exotic namespacing syntax operator
                    print_ultrafast('operator');
                    break;
                }
                if (token_text === ',') {
                    if (flags.var_line) {
                        if (flags.var_line_tainted) {
                            print_ultrafast('column');
                            print_newline();
                            flags.var_line_tainted = false;
                        } else {
                            print_ultrafast('column');
                            print_single_space();
                        }
                    } else if (last_type === 'TK_END_BLOCK' && flags.mode !== "(EXPRESSION)") {
                        print_ultrafast('column');
                        if (flags.mode === 'OBJECT' && last_text === '}') {
                            print_newline();
                            print_newlineforce();
                        } else {
                            print_single_space();
                        }
                    } else {
                        if (flags.mode === 'OBJECT') {
                            print_ultrafast('column');
                            print_newline();
                        } else {
                            // EXPR or DO_BLOCK
                            print_ultrafast('column');
                            print_single_space();
                        }
                    }
                    break;
                    // } else if (in_array(token_text, ['--', '++', '!']) || (in_array(token_text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS']) || in_array(last_text, line_starters) || in_array(last_text, ['==', '!=', '+=', '-=', '*=', '/=', '+', '-'])))) {
                } else if (in_array(token_text, ['--', '++', '!']) || (in_array(token_text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(last_text, line_starters)))) {
                    // unary operators (and binary +/- pretending to be unary) special cases
                    space_before = false;
                    space_after = false;
                    if (last_text === ';' && is_expression(flags.mode)) {
                        // for (;; ++i)
                        //        ^^^
                        space_before = true;
                    }
                    if (last_type === 'TK_WORD' && in_array(last_text, line_starters)) {
                        space_before = true;
                    }
                    if (flags.mode === 'BLOCK' && (last_text === '{' || last_text === ';')) {
                        // { foo; --i }
                        // foo(); --bar;
                        print_newline();
                    }
                } else if (token_text === '.') {
                    // decimal digits or object.property
                    space_before = false;
                } else if (token_text === ':') {
                    if (!is_ternary_op()) {
                        flags.mode = 'OBJECT';
                        space_before = false;
                    }
                }
                if (space_before) {
                    print_single_space();
                }

                if (__optimizations.colorizeOperators) {
                    if (token_text === '?' || token_text === ':') {
                        print_ultrafast('operator');
                        //output.push('<span class="operator">' + token_text + '</span>');
                    } else {
                        print_fast('operator');
                    }
                } else {
                    print_ultrafast('operator');
                }


                if (space_after) {
                    print_single_space();
                }
                if (token_text === '!') {
                    // flags.eat_next_space = true;
                }
                break;
            case 'TK_BLOCK_COMMENT':
                var lines = token_text.split(/\x0a|\x0d\x0a/);
                if (/^\/\*\*/.test(token_text)) {
                    // javadoc: reformat and reindent
                    print_newline();
                    output.push('<span class="comment">' + escapeHTML(lines[0]) + '</span>');
                    for (i = 1; i < lines.length; i++) {
                        print_newline();
                        output.push(' ');
                        output.push('<span class="comment">' + escapeHTML(lines[i]) + '</span>');
                    }
                } else {
                    // simple block comment: leave intact
                    if (lines.length > 1) {
                        // multiline comment block starts with a new line
                        print_newline();
                        trim_output();
                    } else {
                        // single-line /* comment */ stays where it is
                        print_single_space();
                    }
                    for (i = 0; i < lines.length; i++) {
                        output.push('<span class="comment">' + escapeHTML(lines[i]) + '</span>');
                        output.push('\n');
                    }
                }
                print_newline();
                break;
            case 'TK_INLINE_COMMENT':
                print_single_space();
                print_comment();
                if (is_expression(flags.mode)) {
                    print_single_space();
                } else {
                    print_newline();
                }
                break;
            case 'TK_COMMENT':
                // print_newline();
                if (wanted_newline) {
                    print_newline();
                } else {
                    print_single_space();
                }
                print_comment();
                print_newline();
                break;
            case 'TK_UNKNOWN':
                if (last_text === 'return' || last_text === 'throw') {
                    print_single_space();
                }
                print_ultrafast('unknown');
                break;
        }
        last_last_last_text = last_last_text;
        last_last_text = last_text;
        last_type = token_type;
        last_text = token_text;
    }
    return output.join('').replace(/[\n ]+$/, '');
}
// Add support for CommonJS. Just put this file somewhere on your require.paths
// and you will be able to `var js_beautify = require("beautify").js_beautify`.
if (typeof exports !== "undefined") exports.js_beautify = js_beautify;


