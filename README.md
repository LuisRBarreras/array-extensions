# Array-extensions
Exercise to Extend Array prototype

#
**1. each(callback) method.**
Method executes a provided function once per array element.

**Sintax**
    array.each(callback)

**Parameters**
    callback
        Function to execute for each element, taking 2 arguments:
        currentValue
            The current element being processed in the array
        index
            The index of the current element being processed in the array
        



**2. where(spec) method.**
Creates a new array that contains all the elements that satisfies the given specification.

**Sintax**
    array.where(spec)

**Parameters**
    spec
        Function that decide if the element shall or not to be included on the new array.
        currentValue
            The current element being processed in the array