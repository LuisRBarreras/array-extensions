# Array-extensions
Exercise to Extend Array prototype adding a very useful functional programming helpers.

## 1. each(callback) method
Method executes a provided function once per array element.

- **Sintax**
   ```js
        array.each(callback)
    ```

- **Parameters**
    * callback
        Function to execute for each element, taking 2 arguments:
        * currentValue
          The current element being processed in the array.
        * index
          The index of the current element being processed in the array.
        
## 2. where(spec) method
Creates a new array that contains all the elements that satisfies the given specification.

- **Sintax**
    ```js
        array.where(spec)
    ```

- **Parameters**
    * spec
        Function that decide if the element shall or not to be included on the new array.
        * currentValue
            The current element being processed in the array.
            
            
##  3. any(spec) method
This method shall return a true value if any of the elements in the array satisfies the given spec. 

- **Sintax**
    ```js
    array.any(spec)
    ```

- **Parameters**
    * spec
        If the spec is a function then it shall be called for each element in the array, 
        whenever the spec function returns a true value then immediately stop execution and returns true. 
        In case that spec parameter is not a function object, 
        then it will be tested against each element of the array.
        
## 4. select(spec) method.
Creates a new collection containing the elements returned by the spec function. 

- **Sintax**
    ```js
        array.select(spec)
    ```

- **Parameters**
    * spec
        Function to execute for each element and should return a value. 

     
## 5. take(howMany, spec) method
Creates a new array containing ideally howMany elements, it could be less but no more.

- **Sintax**
    ```js
        array.take(howMany, spec)
    ```

- **Parameters**
    * howMany
        the size of array result if there are enough elements.
    * spec
        Function to execute for each element and returns true or false.

## 6. skip(howMany) method.
Creates a new Array which will not include the first howMany elements.

- **Sintax**
    ```js
        array.skip(howMany)
    ```

- **Parameters**
    howMany
        the size of array result if there are enough elements.

## 7. first(spec) method
Returns the first element on collection that satisfies the specification.
This method could return a null value if the collection is empty or if there is not match element.

- **Sintax**
    ```js
        array.first(spec)
    ```

- **Parameters**
    * spec
        Function or null value

##8. last(spec) method
Returns last element on collection that satisfies the specification.
This methoud could return a null value if the colllection is empty or if there is not match element.

- **Sintax**
    ```js
        array.last(number => number % 2 === 0)
    ```
- **Parameters**
    * spec
        Function or null value
        
##9. count(spec) method
Returns the number of elements on the collection that satisfies the specification
if no specification is present then it will return the array's length.

- **Syntax**
    ```js
        array.count(number => number > 2)
    ```
- **Parameters**
    * spec
        Function or null value

##10. index(spec) method
Returns the zero based position in the array of the element that satisfies
the specification. The specification can be either an object value or a function.

- **Syntax**
    ```js
        array.index(number => number === 1)
        array.index(1)
    ```

- **Parameters**
    * spec
        Function or object value

##11. pluck(property) method
Returns a new array containing that property value for each element on the array.

- **Syntax**
    ```js 
        array.pluck('property')
    ```

- **Parameters**
    * property
        String representing a name property

## 12. sum(spec) method.
Returns the summatory of the result of executing `spec` function on each arrays element.
If there is not a `spec` function will return the summatory of the array's elements.
Note: that if you have elements that are not numbers it will concatenate string.

- **Syntax**
    ```js 
        array.sum(x => x * 2)
    ```
- **Parameters**
    * property
        Function or null value

## 13. max(comparator) method
Return the maximum value on the collection, a null value is return if
the array is empty. If not `comparator` is specified then it evaluates
the array elements as if they are numbers.

- **Syntax**
    ```js
        array.max((a, b) => a.age - b.age)
    ```
- **Parameters**
    * comparator
        Function or null value


## 14. min(comparator) method
Return the minimum value on the collection, a null value is return if
the array is empty. If not `comparator` is specified then it evaluates
the array elements as if they are numbers.

- **Syntax**
    ```js
         array.min((a, b) => a.age - b.age)
    ```
- **Parameters**
    * comparator
        Function or null value

## 15. flatten() method.
Returns a new flat array, It extracts from the inner arrays and inserted
in the container array in the same position