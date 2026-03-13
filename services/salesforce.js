const fetch = require("node-fetch")

const SF_BASE = "https://gl1765454964150.my.salesforce.com/services/apexrest"

async function createLoanRequest(data) {
  const response = await fetch(
    `${SF_BASE}/loanrequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

  return response.json()
}

async function checkEligibility(data) {
  const response = await fetch(
    `${SF_BASE}/loan-eligibility`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

  return response.json()
}

module.exports = {
  createLoanRequest,
  checkEligibility
}