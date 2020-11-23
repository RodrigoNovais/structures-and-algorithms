import { LinkedList, EqualsFunction } from './Linked-List'

describe ('Linked List', () => {
    it ('Instantiate new Linked List', () => {
        const list = new LinkedList<number>()

        expect (list).toBeInstanceOf(LinkedList)

        expect (list.clear).toBeInstanceOf(Function)
        expect (list.size).toBeInstanceOf(Function)
        expect (list.isEmpty).toBeInstanceOf(Function)

        expect (list.append).toBeInstanceOf(Function)
        expect (list.prepend).toBeInstanceOf(Function)
        expect (list.insertAt).toBeInstanceOf(Function)

        expect (list.contains).toBeInstanceOf(Function)
        expect (list.indexOf).toBeInstanceOf(Function)

        expect (list.get).toBeInstanceOf(Function)
        expect (list.first).toBeInstanceOf(Function)
        expect (list.last).toBeInstanceOf(Function)

        expect (list.remove).toBeInstanceOf(Function)
        expect (list.removeAt).toBeInstanceOf(Function)
        expect (list.shift).toBeInstanceOf(Function)
        expect (list.pop).toBeInstanceOf(Function)

        expect (list.forEach).toBeInstanceOf(Function)
        expect (list.toArray).toBeInstanceOf(Function)
        expect (list.toString).toBeInstanceOf(Function)

        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()

        expect (list.isEmpty()).toBe(true)
        expect (list.size()).toBe(0)
    })

    it ('Instantiate new Linked List from Iterable', () => {
        const list = new LinkedList<number>([8, 2])

        expect (list.size()).toBe(2)

        expect (list.first()).toBe(8)
        expect (list.last()).toBe(2)

        expect (list.get(0)).toBe(8)
        expect (list.get(1)).toBe(2)
    })
})

describe ('Linked List - Primitive Value', () => {
    const list = new LinkedList<number>()

    beforeEach (() => { list.clear() })

    it ('Should be empty', () => {
        expect (list.isEmpty()).toBe(true)
    })

    it ('Should not be empty', () => {
        list.append(2)

        expect (list.isEmpty()).toBe(false)
    })

    it ('Should insert values to the list', () => {
        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()

        expect (list.size()).toBe(0)

        list.append(2)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(2)

        list.append(8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(8)
    })

    it ('Should insert values to the right index', () => {
        list.append(2)
        list.append(8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.insertAt(1, 6)).toBe(true)
        expect (list.insertAt(1, 4)).toBe(true)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(4)
        expect (list.get(2)).toBe(6)
        expect (list.get(3)).toBe(8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)
    })

    it ('Should insert many values to the right index at once', () => {
        list.append(2)
        list.append(8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.insertAt(1, 4, 6)).toBe(true)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(4)
        expect (list.get(2)).toBe(6)
        expect (list.get(3)).toBe(8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)
    })

    it ('Should insert values to the first position', () => {
        list.append(2)
        list.append(8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.insertAt(0, 6)).toBe(true)
        expect (list.insertAt(0, 4)).toBe(true)

        expect (list.get(0)).toBe(4)
        expect (list.get(1)).toBe(6)
        expect (list.get(2)).toBe(2)
        expect (list.get(3)).toBe(8)

        expect (list.first()).toBe(4)
        expect (list.last()).toBe(8)
    })

    it ('Should insert values to the last position', () => {
        list.append(2)
        list.append(8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.insertAt(list.size(), 6)).toBe(true)
        expect (list.insertAt(list.size(), 4)).toBe(true)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(8)
        expect (list.get(2)).toBe(6)
        expect (list.get(3)).toBe(4)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(4)
    })

    it ('Should not insert values to invalid indexes', () => {
        expect (list.insertAt(1, 8)).toBe(false)

        expect (list.size()).toBe(0)
        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()
    })

    it ('Should append values to the last index', () => {
        list.append(2)
        expect (list.last()).toBe(2)

        list.append(8)
        expect (list.last()).toBe(8)
    })

    it ('Should prepend values to the last index', () => {
        list.prepend(2)
        expect (list.first()).toBe(2)
        expect (list.last()).toBe(2)

        list.prepend(8)
        expect (list.first()).toBe(8)
        expect (list.last()).toBe(2)
    })

    it ('Should contain value', () => {
        list.append(2)
        list.append(8)

        expect (list.contains(2)).toBe(true)
        expect (list.contains(8)).toBe(true)
    })

    it ('Should not contain value', () => {
        list.append(2)
        list.append(8)

        expect (list.contains(6)).toBe(false)
    })

    it ('Should find index of value', () => {
        list.append(2)
        list.append(8)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(1)
    })

    it ('Should remove value from list', () => {
        list.append(2)
        list.append(8)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(1)

        expect (list.size()).toBe(2)

        expect (list.remove(2)).toBe(true)

        expect (list.indexOf(2)).toBe(-1)
        expect (list.indexOf(8)).toBe(0)

        expect (list.size()).toBe(1)

        expect (list.remove(8)).toBe(true)

        expect (list.indexOf(2)).toBe(-1)
        expect (list.indexOf(8)).toBe(-1)

        expect (list.size()).toBe(0)
    })

    it ('Should remove value by index', () => {
        list.append(2)
        list.append(8)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(1)
        expect (list.size()).toBe(2)

        expect (list.removeAt(1)).toBe(8)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(-1)
        expect (list.size()).toBe(1)

        expect (list.removeAt(0)).toBe(2)

        expect (list.size()).toBe(0)
    })

    it ('Should not remove non existing values ', () => {
        list.append(2)
        list.append(8)

        expect (list.remove(6)).toBe(false)
        expect (list.size()).toBe(2)
    })

    it ('Should remove the first value', () => {
        list.append(2)
        list.append(8)

        expect (list.shift()).toBe(2)
        expect (list.shift()).toBe(8)

        expect (list.size()).toBe(0)
    })

    it ('Should remove the last value', () => {
        list.append(2)
        list.append(8)

        expect (list.pop()).toBe(8)
        expect (list.pop()).toBe(2)

        expect (list.size()).toBe(0)
    })

    it ('Should not remove from an empty list', () => {
        expect (list.shift()).toBeUndefined()
        expect (list.pop()).toBeUndefined()

        expect (list.removeAt(0)).toBeUndefined()
    })

    it ('Should convert the list to array', () => {
        expect (list.toArray().length).toBe(0)

        list.append(2)
        list.append(8)

        const array = list.toArray()

        expect (array[0]).toBe(list.get(0))
        expect (array[1]).toBe(list.get(1))

        expect (array.length).toBe(list.size())
    })

    it ('Should convert the list to string', () => {
        expect (list.toString().length).toBe(0)

        list.append(2)
        list.append(8)

        const string = list.toString()
        expect (string).toBe(list.toArray().join(','))
    })

    it ('Should iterate through list with forEach', () => {
        list.append(2)
        list.append(4)
        list.append(6)
        list.append(8)

        list.forEach((value, index) => {
            expect (value).toBe(list.get(index))
        })
    })

    it ('Should break forEach loop', () => {
        list.append(2)
        list.append(4)
        list.append(6)
        list.append(8)

        list.forEach(value => {
            list.remove(value)

            if (value === 4) return false
        })

        expect (list.size()).toBe(2)
        expect (list.first()).toBe(6)
        expect (list.last()).toBe(8)
    })
})

describe ('Linked List - Object Value', () => {
    class User {
        constructor (
            public id: number,
            public name: string,
        ) {}
    }

    const roger = new User(1, 'Roger')
    const lucas = new User(2, 'Lucas')
    const petra = new User(3, 'Petra')
    const carla = new User(4, 'Carla')

    const list = new LinkedList<User>()

    // indexOf, contains, remove
    const equals: EqualsFunction<User> = (v1: User, v2: User) => {
        return v1.id === v2.id
    }

    beforeEach (() => { list.clear() })

    it ('Should be empty', () => {
        expect (list.isEmpty()).toBe(true)
    })

    it ('Should not be empty', () => {
        list.append(lucas)

        expect (list.isEmpty()).toBe(false)
    })

    it ('Should insert values to the list', () => {
        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()

        expect (list.size()).toBe(0)

        list.append(roger)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(roger)

        list.append(lucas)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)

        expect (list.get(0)).toBe(roger)
        expect (list.get(1)).toBe(lucas)
    })

    it ('Should insert values to the right index', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)

        expect (list.insertAt(1, petra)).toBe(true)
        expect (list.insertAt(1, carla)).toBe(true)

        expect (list.get(0)).toBe(roger)
        expect (list.get(1)).toBe(carla)
        expect (list.get(2)).toBe(petra)
        expect (list.get(3)).toBe(lucas)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)
    })

    it ('Should insert many values to the right index at once', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)

        expect (list.insertAt(1, carla, petra)).toBe(true)

        expect (list.get(0)).toBe(roger)
        expect (list.get(1)).toBe(carla)
        expect (list.get(2)).toBe(petra)
        expect (list.get(3)).toBe(lucas)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)
    })

    it ('Should insert values to the first position', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)

        expect (list.insertAt(0, petra)).toBe(true)
        expect (list.insertAt(0, carla)).toBe(true)

        expect (list.get(0)).toBe(carla)
        expect (list.get(1)).toBe(petra)
        expect (list.get(2)).toBe(roger)
        expect (list.get(3)).toBe(lucas)

        expect (list.first()).toBe(carla)
        expect (list.last()).toBe(lucas)
    })

    it ('Should insert values to the last position', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)

        expect (list.insertAt(list.size(), carla)).toBe(true)
        expect (list.insertAt(list.size(), petra)).toBe(true)

        expect (list.get(0)).toBe(roger)
        expect (list.get(1)).toBe(lucas)
        expect (list.get(2)).toBe(carla)
        expect (list.get(3)).toBe(petra)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(petra)
    })

    it ('Should not insert values to invalid indexes', () => {
        expect (list.insertAt(1, roger)).toBe(false)

        expect (list.size()).toBe(0)
        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()
    })

    it ('Should append values to the last index', () => {
        list.append(roger)
        expect (list.last()).toBe(roger)

        list.append(lucas)
        expect (list.last()).toBe(lucas)
    })

    it ('Should prepend values to the last index', () => {
        list.prepend(roger)
        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(roger)

        list.prepend(lucas)
        expect (list.first()).toBe(lucas)
        expect (list.last()).toBe(roger)
    })

    it ('Should contain value', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.contains(roger)).toBe(true)
        expect (list.contains(lucas)).toBe(true)
    })

    it ('Should contain value defined as equal', () => {
        list.append(new User(1, 'Roger'))
        list.append(new User(2, 'Lucas'))

        expect (list.contains(roger)).toBe(false)
        expect (list.contains(lucas)).toBe(false)

        expect (list.contains(roger, equals)).toBe(true)
        expect (list.contains(lucas, equals)).toBe(true)
    })

    it ('Should not contain value', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.contains(carla)).toBe(false)
    })

    it ('Should find index of value', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)
    })

    it ('Should find index of value defined as equal', () => {
        list.append(new User(1, 'Roger'))
        list.append(new User(2, 'Lucas'))

        expect (list.indexOf(roger)).toBe(-1)
        expect (list.indexOf(lucas)).toBe(-1)

        expect (list.indexOf(roger, equals)).toBe(0)
        expect (list.indexOf(lucas, equals)).toBe(1)
    })

    it ('Should remove value from list', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)

        expect (list.size()).toBe(2)

        expect (list.remove(roger)).toBe(true)

        expect (list.indexOf(roger)).toBe(-1)
        expect (list.indexOf(lucas)).toBe(0)

        expect (list.size()).toBe(1)

        expect (list.remove(lucas)).toBe(true)

        expect (list.indexOf(roger)).toBe(-1)
        expect (list.indexOf(lucas)).toBe(-1)

        expect (list.size()).toBe(0)
    })

    it ('should remove value defined as equal from list', () => {
        list.append(new User(1, 'Roger'))
        list.append(new User(2, 'Lucas'))

        expect (list.indexOf(roger)).toBe(-1)
        expect (list.indexOf(lucas)).toBe(-1)

        expect (list.indexOf(roger, equals)).toBe(0)
        expect (list.indexOf(lucas, equals)).toBe(1)

        expect (list.size()).toBe(2)

        expect (list.remove(roger)).toBe(false)
        expect (list.remove(roger, equals)).toBe(true)

        expect (list.indexOf(roger, equals)).toBe(-1)
        expect (list.indexOf(lucas, equals)).toBe(0)

        expect (list.size()).toBe(1)

        expect (list.remove(lucas)).toBe(false)
        expect (list.remove(lucas, equals)).toBe(true)

        expect (list.indexOf(roger, equals)).toBe(-1)
        expect (list.indexOf(lucas, equals)).toBe(-1)

        expect (list.size()).toBe(0)
    })

    it ('Should remove value by index', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)
        expect (list.size()).toBe(2)

        expect (list.removeAt(1)).toBe(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(-1)
        expect (list.size()).toBe(1)

        expect (list.removeAt(0)).toBe(roger)

        expect (list.size()).toBe(0)
    })

    it ('Should not remove non existing values ', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.remove(carla)).toBe(false)
        expect (list.size()).toBe(2)
    })

    it ('Should remove the first value', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.shift()).toBe(roger)
        expect (list.shift()).toBe(lucas)

        expect (list.size()).toBe(0)
    })

    it ('Should remove the last value', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.pop()).toBe(lucas)
        expect (list.pop()).toBe(roger)

        expect (list.size()).toBe(0)
    })

    it ('Should not remove from an empty list', () => {
        expect (list.shift()).toBeUndefined()
        expect (list.pop()).toBeUndefined()

        expect (list.removeAt(0)).toBeUndefined()
    })

    it ('Should convert the list to array', () => {
        expect (list.toArray().length).toBe(0)

        list.append(roger)
        list.append(lucas)

        const array = list.toArray()

        expect (array[0]).toBe(list.get(0))
        expect (array[1]).toBe(list.get(1))

        expect (array.length).toBe(list.size())
    })

    it ('Should convert the list to string', () => {
        expect (list.toString().length).toBe(0)

        list.append(roger)
        list.append(lucas)

        const string = list.toString()
        expect (string).toBe(list.toArray().join(','))
    })

    it ('Should iterate through list with forEach', () => {
        list.append(roger)
        list.append(lucas)
        list.append(carla)
        list.append(petra)

        list.forEach((value, index) => {
            expect (value).toBe(list.get(index))
        })
    })

    it ('Should break forEach loop', () => {
        list.append(roger)
        list.append(lucas)
        list.append(carla)
        list.append(petra)

        list.forEach(value => {
            list.remove(value)

            if (value.id === 2) return false
        })

        expect (list.size()).toBe(2)
        expect (list.first()).toBe(carla)
        expect (list.last()).toBe(petra)
    })
})
