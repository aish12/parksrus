function get_substring(input, n, search_val) {
        var start = input.search(search_val);
        var end = start + search_val.length;
        
        if (start - n > 0) {
            start = start - n;
        }
        
        if (end + n < input.length) {
            end = end + n;
        }
        
        return ".... " + input.substring(start, end) +  " .....";
}