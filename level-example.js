const { Level } = require('level')

// Create a database
const db = new Level('example')

// Add an entry with key 'a' and value 1
db.put('1', "hello")

// // Get value of key 'a': 1
// const value = await db.get('a')

// // Iterate entries with keys that are greater than 'a'
// for await (const [key, value] of db.iterator({ gt: 'a' })) {
//     console.log(value) // 2
// }
