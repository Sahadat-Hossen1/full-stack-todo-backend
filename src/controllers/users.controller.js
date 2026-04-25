const asyncHandler=require("./../utils/asyncHandler")
const User=require("./../models/user.model")

const parseDateValue = (value) => {
    if (!value) return undefined

    const numericValue = Number(value)
    if (!Number.isNaN(numericValue) && numericValue > 0) {
        return new Date(numericValue)
    }

    const parsedDate = new Date(value)
    if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate
    }

    return undefined
}

const normalizeMetadata = (metadata = {}) => ({
    createdAt: parseDateValue(metadata.createdAt),
    lastLogin: parseDateValue(metadata.lastLogin),
    lastLogout: parseDateValue(metadata.lastLogout),
    lastSignInTime: parseDateValue(metadata.lastSignInTime),
})

exports.getUsers=asyncHandler(async(req,res)=>{
    const query = {}

    if (req.query.uid) {
        query.uid = req.query.uid
    }

    const users=await User.find(query)
    res.status(200).json({
        success:true,
        data:users
    })
})
// get single user controller
exports.getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params._id)
    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    res.status(200).json({
        success:true,
        data:user
    })
})
// create user controller
exports.createUser=asyncHandler(async(req,res)=>{
    const {displayName,email,uid,photoURL,phoneNumber,role,metadata}=req.body

    if (!uid) {
        res.status(400)
        throw new Error("User uid is required")
    }

    const existingUser = await User.findOne({ uid })
    const normalizedMetadata = normalizeMetadata(metadata)

    if (existingUser) {
        existingUser.displayName = displayName || existingUser.displayName
        existingUser.email = email || existingUser.email
        existingUser.photoURL = photoURL ?? existingUser.photoURL
        existingUser.phoneNumber = phoneNumber ?? existingUser.phoneNumber
        existingUser.role = existingUser.role || role || "user"
        existingUser.metadata = {
            ...existingUser.metadata?.toObject?.(),
            ...Object.fromEntries(
                Object.entries(normalizedMetadata).filter(([, value]) => value !== undefined)
            ),
        }

        const updatedUser = await existingUser.save()
        return res.status(200).json({
            success:true,
            data:updatedUser
        })
    }

    const user=await User.create({
        displayName,
        email,
        uid,
        photoURL,
        phoneNumber,
        role: role || "user",
        metadata: normalizedMetadata
    })
    res.status(201).json({
        success:true,
        data:user
    })
})

exports.updateUser=asyncHandler(async(req,res)=>{
    const {displayName,email,uid,photoURL,phoneNumber,role,metadata}=req.body
    const user=await User.findById(req.params._id)

    if(!user){
        res.status(404)
        throw new Error("User not found")
    }

    const normalizedMetadata = normalizeMetadata(metadata)

    user.displayName = displayName || user.displayName
    user.email = email || user.email
    user.uid = uid || user.uid
    user.photoURL = photoURL ?? user.photoURL
    user.phoneNumber = phoneNumber ?? user.phoneNumber
    user.role = role || user.role
    user.metadata = {
        ...user.metadata?.toObject?.(),
        ...Object.fromEntries(
            Object.entries(normalizedMetadata).filter(([, value]) => value !== undefined)
        ),
    }

    const updatedUser = await user.save()
    res.status(200).json({
        success:true,
        data:updatedUser
    })
})

