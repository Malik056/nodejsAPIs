exports.sendUpdatedResponse = (res) => {
    res.status(202).json({
        message: "Successfully Updated"
    });
};

exports.sendInvalidParameters = (res) => {
    res.status(400).json({
        message: 'Invalid Parameter'
    });
    return;
};


exports.sendUnAuthorized = (res) => {
    res.status(401).json({
        message: 'Invalid Credentials'
    });
    return;
};


exports.sendResultOK = (res, result) => {
    res.status(200).json(result);
};