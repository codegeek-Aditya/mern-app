

// higher order function - promise version
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error))
    }
};

export { asyncHandler };






// higher order function - try catch version
// const asyncHandler = (fn) => async (error, req, res, next) => {
//     try {
//         await fn(error, req, res, next)
//     } catch (error) {
//         res.status(error.code || 500)
//             .json({
//                 success: false,
//                 message: error.message
//             })
//     }
// }