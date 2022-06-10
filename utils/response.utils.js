


module.exports.createResponse = (res, status, data) => {
  return res.status(status).json({
    data
  })
}