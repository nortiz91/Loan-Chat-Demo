const express = require("express")
const cors = require("cors")
const path = require("path")

const {
  createLoanRequest,
  checkEligibility
} = require("./services/salesforce")

const app = express()

app.use(cors())
app.use(express.json())

//app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(__dirname))

app.post("/loan-request", async (req, res) => {
  const data = req.body
  const result = await createLoanRequest(data)
  res.json(result)
})

app.post("/check-eligibility", async (req, res) => {
  const result = await checkEligibility(req.body)
  res.json(result)
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})