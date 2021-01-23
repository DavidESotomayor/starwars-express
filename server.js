const express = require('express')
const app = express()
const PORT = 3000

//middlewares
//any app runs through this before running through other calls
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

const characters = [
    {
    name: 'Yoda',
    role: 'Jedi Master',
    age: 900,
    forcePoints: 100000,
    avatar: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/baby-yoda-old-yoda-1574103229.jpg?crop=0.486xw:0.973xh;0.514xw,0&resize=480:*',
    routeName: 'yoda'
    },
    {
        name: 'Luke Skywalker',
        role: 'Jedi Master',
        age: 40,
        forcePoints: 10000,
        avatar: 'https://static.wikia.nocookie.net/star-wars-extended-universe/images/3/3d/LukeSkywalker.png/revision/latest?cb=20200125105040',
        routeName: 'lukeskywalker'
    },
    {
            name: 'Princess Leia',
            role: 'General Princess',
            age: 40,
            forcePoints: 5000,
            avatar: 'https://starwarsblog.starwars.com/wp-content/uploads/2016/12/unnamed-3.jpg',
            routeName: 'princessleia'
    },
]

/**
 * HTML ROUTES
 */


app.get('/', (req, res) => {
    res.send('May the force be with you!')
})

// /api/characters - show all character data
app.get('/api/characters', (req, res) => {
    res.json(characters)
})

/**
 * API ROUTES
 */

// /api/characters/:routeName
app.get('/api/characters/:characterName', (req, res) => {
    const targetCharacter = req.params.characterName

    const character = characters.find(character => {
        return character.routeName === targetCharacter // returns character object when found
    })

    // console.log(character); - displays character object in terminal
    res.json(character)
})

// add new characters
app.post('/api/characters/add', (req, res) => {
    // console.log(req.body);
    const newCharacter = req.body
    newCharacter.routeName = newCharacter.name.replace(/ /g, '').toLowerCase()
    characters.push(newCharacter)
    // console.log(characters)
    res.status(200).send()
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})