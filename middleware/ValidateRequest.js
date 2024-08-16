class ValidateRequest {
    constructor(schema) {
        this.schema = schema;
    }

    handle = (req, res, next) => {
        const { error } = this.schema.validate(req.body);
        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }
        next();
    };
}

module.exports = ValidateRequest;


