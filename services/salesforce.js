const fetch = require("node-fetch")
require("dotenv").config()

const SF_TOKEN_URL = process.env.SF_TOKEN_URL
const SF_BASE = process.env.SF_BASE_URL
const CLIENT_ID = process.env.SF_CLIENT_ID
const CLIENT_SECRET = process.env.SF_CLIENT_SECRET

let cachedToken = null

async function getAccessToken() {
  if (cachedToken) return cachedToken

  const response = await fetch(SF_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  })

  const data = await response.json()
  cachedToken = data.access_token
  return cachedToken
}

async function createLoanRequest(data) {
  const token = await getAccessToken()
  const response = await fetch(`${SF_BASE}/loanrequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

async function checkEligibility(data) {
  const token = await getAccessToken()
  const response = await fetch(`${SF_BASE}/loan-eligibility`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

module.exports = { createLoanRequest, checkEligibility }