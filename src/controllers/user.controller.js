import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCLoudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const registerUser = asyncHandler(async (req, res) => {
    // get user details from client
    // validation - ie if the user has sent all the required details and also in correct format etc
    // check if user already exists - username or email
    // check if files are there or not - avatar(required) and cover image
    // if files there then upload on the cloudinary, avatar upload check 
    // after all the checks, then create user object - create entry in db calls
    // remove the encrypted password and refresh token field.
    // check for user creation - user created or not
    // if created -> then send the response
    const { email, username, fullName, password } = req.body;
    // console.log("Email", email)

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are compulsory")
    }

    // check if the user already exists with the same username or email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) throw new ApiError(409, "User already exists with same email or username")

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path; // was throwing error when not sending

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    };

    // console.log(req.files)

    const avatar = await uploadOnCLoudinary(avatarLocalPath);
    const coverImage = await uploadOnCLoudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    // ._id is created by mongoDb itself
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

});

export { registerUser };