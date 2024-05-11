const express = require("express")
const TelegramBot = require("node-telegram-bot-api")
require('dotenv').config();

const app = express()

let port = process.env.PORT || 5000
const token = process.env.TELEGRAM_BOT_TOKEN



const products = [
  { id: 1, name: "Apple", price: 1.5, sellerId: 6448364913 },
  { id: 2, name: "Banana", price: 1, sellerId: 9876543210 },
  { id: 3, name: "Orange", price: 2, sellerId: 6448364913 },
];

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id
  bot.sendMessage(
    chatId,
    "Welcome to our fruit shop! Type /products to see available products."
  )
})


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
  6448364913: "seller",
  2123682001: "buyer",
};

bot.on("message", (msg) => {
  const chatId = msg?.chat?.id
  const text = msg?.text
  const userID = msg?.from?.id

  console.log(msg)

  const role = userRoles[userID];


  if (role === "buyer") {
    const sellerUserId = 6448364913
    bot.sendMessage(sellerUserId, `Buyer inquiry:${text}`)
    console.log(text)
} else if (role === "seller") {
    const buyerUserId = 2123682001
    bot.sendMessage(buyerUserId, `Seller replied:${text}`)
    
    
    
  }
})

app.listen(() => {
  console.log("listening on port", port)
})

