export interface LinkedListNode<T> {
    next?: LinkedListNode<T>

    value: T
}

/**
 * Function signature for checking equality
 *
 * @param {T} v1 - Value provided
 * @param {T} v2 - Value to be compared against
 * @returns {boolean}
 */
export interface EqualsFunction<T> {
    (v1: T, v2: T): boolean
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
     * Creates an Singly Linked List.
     *
     * @constructor
     * @memberof List
     *
     * @param {Iterable<T>=} [values]
     * @template T
     */
    constructor (values?: Iterable<T>) {
        if (values) {
            for (const value of values)
                this.append(value)
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
        values.forEach(value => {
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

        const result = values.every((value, i) => {
            const newNode: LinkedListNode<T> = { value }

            const previous = this.nodeAtIndex(index + i - 1)
            if (!previous) return false

            newNode.next = previous.next
            previous.next = newNode

            this.length++

            return true
        })

        return result
    }

    /**
     * Returns the first occurrence of the specified element in the linked list  
     * Equality comparison function must be provided for nun-primitive values
     *
     * @param {T} value - Value to search for
     * @param {EqualsFunction<T>=} [equalityFunction] - Optional equality comparison function
     * @returns {number} Index of the first occurrence of the element. -1 if the element does not exist
     */
    public indexOf (value: T, equalsFunction?: EqualsFunction<T>): number {
        if (!this.length) return -1

        const equalsF = equalsFunction || this.defaultEquals

        let index = 0
        let current = this.head

        while (current && !equalsF(value, current.value)) {
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
     * @param {EqualsFunction<T>=} [equalityFunction] - Optional equality comparison function
     * @returns {boolean}
     */
    public contains (value: T, equalsFunction?: EqualsFunction<T>): boolean {
        const index = this.indexOf(value, equalsFunction)

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
     * Remove the first occurrence of the specified value in the list.  
     * If the value inside the list are not comparable with the === operator a
     * custom equals function should be provided to perform searches
     *
     * @param {T} value - Value to remove, if present
     * @param {EqualsFunction<T>=} [equalityFunction] - Optional equality comparison function
     * @returns {boolean} True if the list contained the specified value
     */
    public remove (value: T, equalsFunction?: EqualsFunction<T>): boolean {
        if (!this.length) return false

        const index = this.indexOf(value, equalsFunction)

        return !!this.removeAt(index)
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

        let current = this.head

        for (let i = 0; i < index - 1 && current; i++)
            current = current.next

        const value = current!.next!.value

        const nextNode = current!.next!.next
        current!.next = nextNode

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
     *
     * @returns {void}
     */
    public clear (): void {
        this.head = undefined
        this.tail = undefined

        this.length = 0
    }

    /**
     * Returns an array containing all of the elements in this list in proper sequence.
     *
     * @return {Array.<T>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    public toArray(): T[] {
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

    /**
     * Default function to test equality.
     *
     * @private
     * @param {T} v1 - Value provided
     * @param {T} v2 - Value to be compared against
     * @returns {boolean}
     */
    private defaultEquals <T>(v1: T, v2: T): boolean {
        return v1 === v2
    }
}
