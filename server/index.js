const express = require("express")
const TelegramBot = require("node-telegram-bot-api")

const app = express()

let port = 5000
const token = "6871871417:AAGjrL4vkZKL31KBHnIYuOE-uzuggnCGJYE"

const products = [
  { id: 1, name: "Apple", price: 1.5 },
  { id: 2, name: "Banana", price: 1 },
  { id: 3, name: "Orange", price: 2 },
]

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id
  bot.sendMessage(
    chatId,
    "Welcome to our fruit shop! Type /products to see available products."
  )
})

// Handle '/products' command to display available products
// bot.onText(/\/products/, (msg) => {
//     chatId = msg.chat.id;
//     let message = 'Available Products:\n';

//     bot.sendMessage(chatId, message);
//       {
//         products.map((product) => {
//             message = `${product.id} ${product.name} ${product.price}`
//             console.log(message)
//             bot.sendMessage(chatId, message);
//         })
//     }
// });

function gennerateProductBUTTON() {
  return products.map((product) => ({
    text: `${product.name} ${product.price}`,
    callback_data: product.id.toString(),
    backgroundColor: "red",
  }))
}
bot.onText(/\/products/, (msg) => {
  chatId = msg.chat.id
  let message = "Available Products:\n"
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [gennerateProductBUTTON()],
    }),
  }

  bot.sendMessage(chatId, message, options)
})
const userRoles = {
  byuserUserId: "buyer",
  sellerUserId: "seller",
}

bot.on("message", (msg) => {
  const chatId = msg?.chat?.id
  const text = msg?.text
  const userID = msg?.from?.id

  console.log(msg)

  const role = "seller"

  if (role === "buyer") {
    const sellerUserId = "sellerUserId"
    bot.sendMessage(userID, `Buyer inquiry:${text}`)
    console.log(text)
} else if (role === "seller") {
    const buyerUserId = "buyerUserId"
    bot.sendMessage(userID, `Seller inquiry:${text}`)
    
    
    
  }
})

app.listen(() => {
  console.log("listening on port", port)
})

