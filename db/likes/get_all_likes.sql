SELECT * FROM likes
INNER JOIN dates ON likes.date_id = dates.date_id
WHERE user_id = ($1)