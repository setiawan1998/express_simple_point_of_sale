exports.success = (res, data) => {
    const results = {
        status: 200,
        data,
        message: ''
    }
    res.status(200).json(results)
}
exports.err = (res, data) => {
    const results = {
        status: 500,
        data: [],
        message: data
    }
    res.status(500).json(results)
}
exports.denied = (res, data) => {
    const results = {
        status: 400,
        data: [],
        message: data
    }
    res.status(400).json(results)
}