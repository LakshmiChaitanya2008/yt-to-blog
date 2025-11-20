import jwt from "jsonwebtoken";

export default async function (req, res, next) {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Not Authorized" });
  console.log(token);
  jwt.verify(token, "SECRET_123", (err, user) => {
    if (err) return res.status(403).json({ msg: err });

    req.user = user;
    next();
  });
}
