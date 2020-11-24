import { EqualsFunction, defaultEquals } from './utils'

export interface LinkedListNode<T> {
    next?: LinkedListNode<T>

    value: T
}

export class LinkedList<T> implements Iterable<T> {
    /**
     * First node in the list.
     *
     * @private
     * @type {LinkedListNode}
     */
    private head?: LinkedListNode<T>

    /**
     * Last node in the list.
     *
     * @private
     * @type {LinkedListNode}
     */
    private tail?: LinkedListNode<T>

    /**
     * Number of values in the list.  
     * This is a number one higher than the highest element defined in an list.
     *
     * @private
     * @type {number}
     */
    private length: number = 0

    /**
     * Equality comparison function  
     * Default set to === operator
     *
     * @private
     * @type {EqualsFunction<T>}
     */
    private equalsF: EqualsFunction<T> = defaultEquals

    /**
     * Creates an Singly Linked List.
     *
     * @constructor
     * @memberof List
     *
     * @template T
     */
    constructor ()

    /**
     * Creates an Singly Linked List.
     *
     * @constructor
     * @memberof List
     *
     * @param {Iterable<T>} values
     * @template T
     */
    constructor (values: Iterable<T>)

    /**
     * Creates an Singly Linked List.
     *
     * @constructor
     * @memberof List
     *
     * @param {EqualsFunction<T>} equalityFunction - Equality comparison function
     * @template T
     */
    constructor (equalsFunction: EqualsFunction<T>)

    /**
     * Creates an Singly Linked List.
     *
     * @constructor
     * @memberof List
     *
     * @param {Iterable<T>} values
     * @param {EqualsFunction<T>} equalityFunction - Equality comparison function
     * @template T
     */
    constructor (values: Iterable<T>, equalsFunction?: EqualsFunction<T>)

    constructor (...args: Array<any>) {
        if (args.length === 1) {
            if (typeof args[0][Symbol.iterator] === 'function') {
                for (const value of args[0])
                    this.append(value)
            } else {
                this.equalsF = args[0]
            }
        }

        if (args.length === 2) {
            const values: Iterable<T> = args[0]

            for (const value of values)
                this.append(value)

            this.equalsF = args[1]
        }

        return this
    }

    /**
     * Return the number of values in the list.  
     * This is a number one higher than the highest element defined in an list.
     *
     * @returns {number} Number of elements in the list.
     */
    public size (): number {
        return this.length
    }

    /**
     * Returns true if the Linked Link contains no value.
     *
     * @returns {boolean}
     */
    public isEmpty (): boolean {
        return !this.length
    }

    /**
     * Returns the first value in the list.
     *
     * @returns {T=} First value of the list or undefined if the list is empty
     */
    public first (): T | undefined {
        return this.head?.value
    }

    /**
     * Returns the last value in the list.
     *
     * @returns {T=} Last value in the list or undefined if the list is empty
     */
    public last (): T | undefined {
        return this.tail?.value
    }

    /**
     * Appends new values to the list.
     *
     * @param {...T} value - Values to add to the list
     */
    public append (...values: T[]): void {
        values.forEach(value => {
            const newNode: LinkedListNode<T> = { value }

            if (!this.length) {
                this.head = newNode
                this.tail = newNode
            } else {
                this.tail!.next = newNode
                this.tail = newNode
            }

            this.length++
        })
    }

    /**
     * Prepends new values to the list.
     *
     * @param {...T} value - Values to add to the list
     */
    public prepend (...values: T[]): void {
        values.reverse().forEach(value => {
            const newNode: LinkedListNode<T> = { value }

            if (!this.length) {
                this.head = newNode
                this.tail = newNode
            } else {
                newNode.next = this.head
                this.head = newNode
            }

            this.length++
        })
    }

    /**
     * Add an element to the the list at the given position.
     *
     * @param {...T} value - Values to add to the list
     * @param {number} index - Index to add the element
     *
     * @returns {boolean} False if the index is invalid
     */
    public insertAt (index: number, ...values: T[]): boolean {
        if (index < 0 || index > this.length)
            return false

        if (index === 0) {
            this.prepend(...values)

            return true
        }

        if (index === this.length) {
            this.append(...values)

            return true
        }

        let previous = this.nodeAtIndex(index - 1)
        if (!previous) return false

        values.forEach((value) => {
            const newNode: LinkedListNode<T> = { value }

            newNode.next = previous!.next
            previous!.next = newNode

            previous = previous!.next

            this.length++
        })

        return true
    }

    /**
     * Returns the first occurrence of the specified element in the linked list  
     * Equality comparison function must be provided for nun-primitive values
     *
     * @param {T} value - Value to search for
     * @returns {number} Index of the first occurrence of the element. -1 if the element does not exist
     */
    public indexOf (value: T): number {
        if (!this.length) return -1

        let index = 0
        let current = this.head

        while (current && !this.equalsF(value, current.value)) {
            if (!current.next) return -1

            current = current.next
            index += 1
        }

        return index
    }

    /**
     * Returns if an value exists in the linked list  
     * Equality comparison function must be provided for nun-primitive values
     *
     * @param {T} value - Value to search for
     * @returns {boolean}
     */
    public contains (value: T): boolean {
        const index = this.indexOf(value)

        return index !== -1
    }

    /**
     * Gets the value at specified index.
     *
     * @param {number} index - Index of the value
     * @returns {T}
     */
    public get (index: number): T | undefined {
        return this.nodeAtIndex(index)?.value
    }

    /**
     * Remove all references of the specified value in the list.  
     * If the value inside the list are not comparable with the === operator a
     * custom equals function should be provided to perform searches
     *
     * @param {T} value - Value to remove, if present
     * @returns {boolean} True if the list contained the specified value
     */
    public remove (value: T): boolean {
        if (!this.length) return false

        let flag = false
        let previous: LinkedListNode<T> | undefined = undefined
        let currentNode: LinkedListNode<T> | undefined = this.head

        if (this.equalsF(value, this.head!.value)) {
            this.shift()

            flag = true
        }

        while (currentNode) {
            if (previous && this.equalsF(value, currentNode.value)) {
                previous!.next = currentNode.next
                currentNode.next = undefined

                this.length -= 1

                flag = true
            }

            previous = currentNode
            currentNode = currentNode.next
        }

        return flag
    }

    /**
     * Remove the first occurrence of the specified value in the list.  
     * If the value inside the list are not comparable with the === operator a
     * custom equals function should be provided to perform searches
     *
     * @param {T} value - Value to remove, if present
     * @returns {boolean} True if the list contained the specified value
     */
    public removeFirstOccurrence (value: T): boolean {
        if (!this.length) return false

        if (this.equalsF(value, this.head!.value)) {
            this.shift()

            return true
        }

        let previous: LinkedListNode<T> | undefined = undefined
        let currentNode: LinkedListNode<T> | undefined = this.head

        while (currentNode) {
            if (previous && this.equalsF(value, currentNode.value)) {
                previous!.next = currentNode.next
                currentNode.next = undefined

                this.length -= 1

                return true
            }

            previous = currentNode
            currentNode = currentNode.next
        }

        return false
    }

    /**
     * Remove the last occurrence of the specified value in the list.  
     * If the value inside the list are not comparable with the === operator a
     * custom equals function should be provided to perform searches
     *
     * @param {T} value - Value to remove, if present
     * @returns {boolean} True if the list contained the specified value
     */
    public removeLastOccurrence (value: T): boolean {
        if (!this.length) return false

        if (this.equalsF(value, this.tail!.value)) {
            this.pop()

            return true
        }

        let lastPrevious: LinkedListNode<T> | undefined = undefined
        let lastCurrentNode: LinkedListNode<T> | undefined = this.head

        let previous: LinkedListNode<T> | undefined = undefined
        let currentNode: LinkedListNode<T> | undefined = this.head

        while (currentNode) {
            if (previous && this.equalsF(value, currentNode.value)) {
                lastPrevious = previous
                lastCurrentNode = currentNode
            }

            previous = currentNode
            currentNode = currentNode.next
        }

        if (lastPrevious && lastCurrentNode) {
            lastPrevious.next = lastCurrentNode.next
            lastCurrentNode.next = undefined

            this.length -= 1

            return true
        }

        return false
    }

    /**
     * Removes the value at the specified position in the list.
     *
     * @param {number} index - Index to add the element
     * @returns {T} Removed element or undefined if out of bounds
     */
    public removeAt (index: number): T | undefined {
        if (!this.length) return undefined
        if (index < 0 || index > this.length)
            return undefined

        if (index === 0) return this.shift()

        const current = this.nodeAtIndex(index - 1)
        if (!current) return undefined

        const value = current.next?.value

        if (current.next) {
            const newNode = current.next.next
            current.next = newNode
        }

        this.length--

        return value
    }

    /**
     * Removes the first value in the list and returns it.
     *
     * @returns {T=}
     */
    public shift (): T | undefined {
        if (!this.length) return undefined

        const value = this.head!.value

        if (!this.head?.next)
            this.clear()
        else {
            this.head = this.head?.next

            this.length--
        }

        return value
    }

    /**
     * Removes the last value in the list and returns it.
     *
     * @returns {T=}
     */
    public pop (): T | undefined {
        if (!this.length) return undefined

        return this.removeAt(this.length - 1)
    }

    /**
     * Removes all of the elements from this list.
     */
    public clear (): void {
        this.head = undefined
        this.tail = undefined

        this.length = 0
    }

    /**
     * Combine two lists and generate a new one.
     *
     * @param list - Additional items to add to the end of the new list
     * @param {EqualsFunction<T | U>=} [equalityFunction] - Optional equality comparison function
     *
     * @template U
     */
    public concat <U>(list: LinkedList<U>, equalsFunction?: EqualsFunction<T | U>): LinkedList<T | U> {
        const linkedList = equalsFunction ?
            new LinkedList<T | U> (equalsFunction) :
            new LinkedList<T | U> ()

        this.forEach(value => linkedList.append(value))
        list.forEach(value => linkedList.append(value))

        return linkedList
    }

    /**
     * Reverses the order of the values in the linked list.
     */
    public reverse(): void {
        let previous: LinkedListNode<T> | undefined = undefined
        let current: LinkedListNode<T> | undefined = this.head
        let temp: LinkedListNode<T> | undefined = undefined

        while (current) {
            temp = current.next
            current.next = previous
            previous = current
            current = temp
        }

        temp = this.head
        this.head = this.tail
        this.tail = temp
    }

    /**
     * Returns an array containing all of the elements in this list in proper sequence.
     *
     * @returns {Array.<T>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    public toArray (): T[] {
        const array: T[] = []
        const it = this[Symbol.iterator]()

        let currentNode = it.next()

        while (!currentNode.done) {
            array.push(currentNode.value)
            currentNode = it.next()
        }

        return array
    }

    /**
     * Returns a string representation of the list
     *
     * @returns {string}
     */
    public toString (): string {
        return this.toArray().toString()
    }

    /**
     * Performs the specified action for each value in the list.
     *
     * @param callbackfn — A function that accepts up to three arguments.
     * forEach calls the callbackfn function one time for each element in the array.
     */
    public forEach (callbackfn: (value: T, index: number, list: LinkedList<T>) => void): void {
        let current = this.head

        for (let i = 0; i < this.length; i++) {
            callbackfn(current!.value, i, this)

            current = current!.next
        }
    }

    *[Symbol.iterator](): Iterator<T> {
        if (!this.length) return

        let current: LinkedListNode<T>

        for (current = this.head!; current; current = current.next!)
            yield current.value
    }

    /**
     * Gets the node at the given position.
     *
     * @private
     * @param {number} index - Index of the node
     * @returns {LinkedListNode<T>} Node at specified index
     */
    private nodeAtIndex (index: number): LinkedListNode<T> | undefined {
        if (!this.length) return undefined
        if (index < 0 || index > this.length)
            return undefined

        if (index === 0) return this.head
        if (index === this.length - 1) return this.tail

        let current = this.head
        for (let i = 0; i < index && current; i++)
            current = current.next

        return current
    }
}
