import jwt from "jsonwebtoken";

export const sendCookie = (user, res) => {
    const token = jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.SECRET_KEY);

    res.status(201).cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none', 
    }).json(user);
}