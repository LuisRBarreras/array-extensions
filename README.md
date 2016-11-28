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
            
            
**3. any(spec) method.**
This method shall return a true value if any of the elements in the array satisfies the given spec. 

**Sintax**
    array.any(spec)

**Parameters**
    spec
        If the spec is a function then it shall be called for each element in the array, 
        whenever the spec function returns a true value then immediately stop execution and returns true. 
        In case that spec parameter is not a function object, 
        then it will be tested against each element of the array.
        
**4. select(spec) method.**
Creates a new collection containing the elements returned by the spec function. 

**Sintax**
    array.select(spec)

**Parameters**
    spec
        Function to execute for each element and should return a value. 