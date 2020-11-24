import { LinkedList } from './Linked-List'
import { EqualsFunction } from './utils'

class User {
    constructor (
        public id: number,
        public name: string,
    ) {}
}

const equals: EqualsFunction<User> = (v1: User, v2: User) => {
    return v1.id === v2.id
}

describe ('Linked List', () => {
    it ('Should instantiate new Linked List', () => {
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

    it ('Should instantiate new Linked List from Iterable', () => {
        const list = new LinkedList<number>([8, 2])

        expect (list.size()).toBe(2)

        expect (list.first()).toBe(8)
        expect (list.last()).toBe(2)

        expect (list.get(0)).toBe(8)
        expect (list.get(1)).toBe(2)
    })

    it ('Should instantiate new Linked List with equality comparison function', () => {
        const roger = new User(1, 'Roger')
        const lucas = new User(2, 'Lucas')

        const list = new LinkedList<User>(equals)

        list.append(roger)
        list.append(lucas)

        expect (list.size()).toBe(2)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)

        expect (list.get(0)).toBe(roger)
        expect (list.get(1)).toBe(lucas)
    })

    it ('Should instantiate new Linked List from Iterable with equality comparison function', () => {
        const roger = new User(1, 'Roger')
        const lucas = new User(2, 'Lucas')

        const list = new LinkedList<User>([roger, lucas], equals)

        expect (list.size()).toBe(2)

        expect (list.first()).toBe(roger)
        expect (list.last()).toBe(lucas)

        expect (list.get(0)).toBe(roger)
        expect (list.get(1)).toBe(lucas)
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

    it ('Should append many values to the last index', () => {
        list.append(2)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(2)

        list.append(4, 6, 8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(4)
        expect (list.get(2)).toBe(6)
        expect (list.get(3)).toBe(8)
    })

    it ('Should prepend values to the first index', () => {
        list.prepend(2)
        expect (list.first()).toBe(2)
        expect (list.last()).toBe(2)

        list.prepend(8)
        expect (list.first()).toBe(8)
        expect (list.last()).toBe(2)
    })

    it ('Should prepend many values to the first index', () => {
        list.append(8)

        expect (list.first()).toBe(8)
        expect (list.last()).toBe(8)

        list.prepend(2, 4, 6)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(4)
        expect (list.get(2)).toBe(6)
        expect (list.get(3)).toBe(8)
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
        list.append(2)
        list.append(8)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(1)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(8)
        expect (list.get(2)).toBe(2)
        expect (list.get(3)).toBe(8)

        expect (list.size()).toBe(4)

        expect (list.remove(2)).toBe(true)

        expect (list.indexOf(2)).toBe(-1)
        expect (list.indexOf(8)).toBe(0)

        expect (list.get(0)).toBe(8)
        expect (list.get(1)).toBe(8)

        expect (list.size()).toBe(2)

        expect (list.remove(8)).toBe(true)

        expect (list.indexOf(2)).toBe(-1)
        expect (list.indexOf(8)).toBe(-1)

        expect (list.size()).toBe(0)
    })

    it ('Should remove first value occurrence from list', () => {
        list.append(2)
        list.append(8)
        list.append(4)
        list.append(6)
        list.append(2)
        list.append(8)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(1)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(8)
        expect (list.get(2)).toBe(4)
        expect (list.get(3)).toBe(6)
        expect (list.get(4)).toBe(2)
        expect (list.get(5)).toBe(8)

        expect (list.size()).toBe(6)

        expect (list.removeFirstOccurrence(2)).toBe(true)

        expect (list.indexOf(8)).toBe(0)
        expect (list.indexOf(4)).toBe(1)
        expect (list.indexOf(6)).toBe(2)
        expect (list.indexOf(2)).toBe(3)

        expect (list.get(0)).toBe(8)
        expect (list.get(1)).toBe(4)
        expect (list.get(2)).toBe(6)
        expect (list.get(3)).toBe(2)
        expect (list.get(4)).toBe(8)

        expect (list.size()).toBe(5)

        expect (list.removeFirstOccurrence(8)).toBe(true)

        expect (list.indexOf(4)).toBe(0)
        expect (list.indexOf(6)).toBe(1)
        expect (list.indexOf(2)).toBe(2)
        expect (list.indexOf(8)).toBe(3)

        expect (list.get(0)).toBe(4)
        expect (list.get(1)).toBe(6)
        expect (list.get(2)).toBe(2)
        expect (list.get(3)).toBe(8)

        expect (list.size()).toBe(4)
    })

    it ('Should remove last value occurrence from list', () => {
        list.append(2)
        list.append(8)
        list.append(2)
        list.append(8)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(1)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(8)
        expect (list.get(2)).toBe(2)
        expect (list.get(3)).toBe(8)

        expect (list.size()).toBe(4)

        expect (list.removeLastOccurrence(2)).toBe(true)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(1)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(8)
        expect (list.get(2)).toBe(8)

        expect (list.size()).toBe(3)

        expect (list.removeLastOccurrence(8)).toBe(true)

        expect (list.indexOf(2)).toBe(0)
        expect (list.indexOf(8)).toBe(1)

        expect (list.get(0)).toBe(2)
        expect (list.get(1)).toBe(8)

        expect (list.size()).toBe(2)
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

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.shift()).toBe(2)
        expect (list.shift()).toBe(8)

        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()

        expect (list.size()).toBe(0)
    })

    it ('Should remove the last value', () => {
        list.append(2)
        list.append(8)

        expect (list.first()).toBe(2)
        expect (list.last()).toBe(8)

        expect (list.pop()).toBe(8)
        expect (list.pop()).toBe(2)

        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()

        expect (list.size()).toBe(0)
    })

    it ('Should not remove from an empty list', () => {
        expect (list.shift()).toBeUndefined()
        expect (list.pop()).toBeUndefined()

        expect (list.removeAt(0)).toBeUndefined()
    })

    it ('Should concat two lists', () => {
        list.append(2)
        list.append(8)

        expect (list.size()).toBe(2)

        const differentList = new LinkedList<number>()

        differentList.append(4)
        differentList.append(6)

        expect (differentList.size()).toBe(2)

        const newList = list.concat<number>(differentList)

        expect (newList.size()).toBe(4)

        expect (newList.get(0)).toBe(2)
        expect (newList.get(1)).toBe(8)
        expect (newList.get(2)).toBe(4)
        expect (newList.get(3)).toBe(6)
    })

    it ('Should concat two lists of different types', () => {
        list.append(2)
        list.append(8)

        expect (list.size()).toBe(2)

        const differentList = new LinkedList<string>()

        differentList.append('quatro')
        differentList.append('seis')

        expect (differentList.size()).toBe(2)

        const newList = list.concat(differentList)

        expect (newList.size()).toBe(4)

        expect (newList.get(0)).toBe(2)
        expect (newList.get(1)).toBe(8)
        expect (newList.get(2)).toBe('quatro')
        expect (newList.get(3)).toBe('seis')
    })

    it ('Should reverse the list', () => {
        list.append(2)
        list.append(4)
        list.append(6)
        list.append(8)

        expect (list.size()).toBe(4)

        expect (list.get(0)).toEqual(2)
        expect (list.get(1)).toEqual(4)
        expect (list.get(2)).toEqual(6)
        expect (list.get(3)).toEqual(8)

        list.reverse()

        expect (list.get(0)).toEqual(8)
        expect (list.get(1)).toEqual(6)
        expect (list.get(2)).toEqual(4)
        expect (list.get(3)).toEqual(2)
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
    const roger = new User(1, 'Roger')
    const lucas = new User(2, 'Lucas')
    const petra = new User(3, 'Petra')
    const carla = new User(4, 'Carla')

    const list = new LinkedList<User>(equals)

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

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(roger)

        list.append(lucas)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
    })

    it ('Should insert values to the right index', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)

        expect (list.insertAt(1, petra)).toBe(true)
        expect (list.insertAt(1, carla)).toBe(true)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(carla)
        expect (list.get(2)).toEqual(petra)
        expect (list.get(3)).toEqual(lucas)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)
    })

    it ('Should insert many values to the right index at once', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)

        expect (list.insertAt(1, carla, petra)).toBe(true)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(carla)
        expect (list.get(2)).toEqual(petra)
        expect (list.get(3)).toEqual(lucas)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)
    })

    it ('Should insert values to the first position', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)

        expect (list.insertAt(0, petra)).toBe(true)
        expect (list.insertAt(0, carla)).toBe(true)

        expect (list.get(0)).toEqual(carla)
        expect (list.get(1)).toEqual(petra)
        expect (list.get(2)).toEqual(roger)
        expect (list.get(3)).toEqual(lucas)

        expect (list.first()).toEqual(carla)
        expect (list.last()).toEqual(lucas)
    })

    it ('Should insert values to the last position', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)

        expect (list.insertAt(list.size(), carla)).toBe(true)
        expect (list.insertAt(list.size(), petra)).toBe(true)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
        expect (list.get(2)).toEqual(carla)
        expect (list.get(3)).toEqual(petra)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(petra)
    })

    it ('Should not insert values to invalid indexes', () => {
        expect (list.insertAt(1, roger)).toBe(false)

        expect (list.size()).toBe(0)
        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()
    })

    it ('Should append values to the last index', () => {
        list.append(roger)
        expect (list.last()).toEqual(roger)

        list.append(lucas)
        expect (list.last()).toEqual(lucas)
    })

    it ('Should append many values to the first index', () => {
        list.append(roger)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(roger)

        list.append(lucas, petra, carla)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(carla)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
        expect (list.get(2)).toEqual(petra)
        expect (list.get(3)).toEqual(carla)
    })

    it ('Should prepend values to the first index', () => {
        list.prepend(roger)
        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(roger)

        list.prepend(lucas)
        expect (list.first()).toEqual(lucas)
        expect (list.last()).toEqual(roger)
    })

    it ('Should prepend many values to the first index', () => {
        list.append(carla)

        expect (list.first()).toEqual(carla)
        expect (list.last()).toEqual(carla)

        list.prepend(roger, lucas, petra)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(carla)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
        expect (list.get(2)).toEqual(petra)
        expect (list.get(3)).toEqual(carla)
    })

    it ('Should contain value', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.contains(roger)).toBe(true)
        expect (list.contains(lucas)).toBe(true)
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

    it ('Should remove value from list', () => {
        list.append(roger)
        list.append(lucas)
        list.append(roger)
        list.append(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
        expect (list.get(2)).toEqual(roger)
        expect (list.get(3)).toEqual(lucas)

        expect (list.size()).toBe(4)

        expect (list.remove(roger)).toBe(true)

        expect (list.indexOf(roger)).toBe(-1)
        expect (list.indexOf(lucas)).toBe(0)

        expect (list.get(0)).toEqual(lucas)
        expect (list.get(1)).toEqual(lucas)

        expect (list.size()).toBe(2)

        expect (list.remove(lucas)).toBe(true)

        expect (list.indexOf(roger)).toBe(-1)
        expect (list.indexOf(lucas)).toBe(-1)

        expect (list.size()).toBe(0)
    })

    it ('Should remove first value occurrence from list', () => {
        list.append(roger)
        list.append(lucas)
        list.append(petra)
        list.append(roger)
        list.append(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)
        expect (list.indexOf(petra)).toBe(2)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
        expect (list.get(2)).toEqual(petra)
        expect (list.get(3)).toEqual(roger)
        expect (list.get(4)).toEqual(lucas)

        expect (list.size()).toBe(5)

        expect (list.removeFirstOccurrence(carla)).toBe(false)

        expect (list.size()).toBe(5)

        expect (list.removeFirstOccurrence(lucas)).toBe(true)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(petra)).toBe(1)
        expect (list.indexOf(lucas)).toBe(3)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(petra)
        expect (list.get(2)).toEqual(roger)
        expect (list.get(3)).toEqual(lucas)

        expect (list.size()).toBe(4)

        expect (list.removeFirstOccurrence(roger)).toBe(true)

        expect (list.indexOf(petra)).toBe(0)
        expect (list.indexOf(roger)).toBe(1)
        expect (list.indexOf(lucas)).toBe(2)

        expect (list.get(0)).toEqual(petra)
        expect (list.get(1)).toEqual(roger)
        expect (list.get(2)).toEqual(lucas)

        expect (list.size()).toBe(3)
    })

    it ('Should remove last value occurrence from list', () => {
        list.append(roger)
        list.append(lucas)
        list.append(roger)
        list.append(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
        expect (list.get(2)).toEqual(roger)
        expect (list.get(3)).toEqual(lucas)

        expect (list.size()).toBe(4)

        expect (list.removeLastOccurrence(carla)).toBe(false)

        expect (list.size()).toBe(4)

        expect (list.removeLastOccurrence(roger)).toBe(true)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
        expect (list.get(2)).toEqual(lucas)

        expect (list.size()).toBe(3)

        expect (list.removeLastOccurrence(lucas)).toBe(true)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)

        expect (list.size()).toBe(2)
    })

    it ('Should remove value by index', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(1)
        expect (list.size()).toBe(2)

        expect (list.removeAt(1)).toEqual(lucas)

        expect (list.indexOf(roger)).toBe(0)
        expect (list.indexOf(lucas)).toBe(-1)
        expect (list.size()).toBe(1)

        expect (list.removeAt(0)).toEqual(roger)

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

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)

        expect (list.shift()).toEqual(roger)
        expect (list.shift()).toEqual(lucas)

        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()

        expect (list.size()).toBe(0)
    })

    it ('Should remove the last value', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.first()).toEqual(roger)
        expect (list.last()).toEqual(lucas)

        expect (list.pop()).toEqual(lucas)
        expect (list.pop()).toEqual(roger)

        expect (list.first()).toBeUndefined()
        expect (list.last()).toBeUndefined()

        expect (list.size()).toBe(0)
    })

    it ('Should not remove from an empty list', () => {
        expect (list.shift()).toBeUndefined()
        expect (list.pop()).toBeUndefined()

        expect (list.removeAt(0)).toBeUndefined()
    })

    it ('Should concat two lists', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.size()).toBe(2)

        const differentList = new LinkedList<User>()

        differentList.append(petra)
        differentList.append(carla)

        expect (differentList.size()).toBe(2)

        const newList = list.concat(differentList)

        expect (newList.size()).toBe(4)

        expect (newList.get(0)).toBe(roger)
        expect (newList.get(1)).toBe(lucas)
        expect (newList.get(2)).toBe(petra)
        expect (newList.get(3)).toBe(carla)
    })

    it ('Should concat two lists of different types', () => {
        list.append(roger)
        list.append(lucas)

        expect (list.size()).toBe(2)

        const differentList = new LinkedList<string>()

        differentList.append('petra')
        differentList.append('carla')

        expect (differentList.size()).toBe(2)

        const newList = list.concat(differentList)

        expect (newList.size()).toBe(4)

        expect (newList.get(0)).toBe(roger)
        expect (newList.get(1)).toBe(lucas)
        expect (newList.get(2)).toBe('petra')
        expect (newList.get(3)).toBe('carla')
    })

    it ('Should reverse the list', () => {
        list.append(roger)
        list.append(lucas)
        list.append(petra)
        list.append(carla)

        expect (list.size()).toBe(4)

        expect (list.get(0)).toEqual(roger)
        expect (list.get(1)).toEqual(lucas)
        expect (list.get(2)).toEqual(petra)
        expect (list.get(3)).toEqual(carla)

        list.reverse()

        expect (list.get(0)).toEqual(carla)
        expect (list.get(1)).toEqual(petra)
        expect (list.get(2)).toEqual(lucas)
        expect (list.get(3)).toEqual(roger)
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
        expect (list.first()).toEqual(carla)
        expect (list.last()).toEqual(petra)
    })
})
