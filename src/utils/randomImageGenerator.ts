export const randomImageGenerator = () => {
  const imageUrls = [
    "https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFic3RyYWN0fGVufDB8MXwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGFic3RyYWN0fGVufDB8MXwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGFic3RyYWN0fGVufDB8MXwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1549317336-206569e8475c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGFic3RyYWN0fGVufDB8MXwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1507908708918-778587c9e563?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGFic3RyYWN0fGVufDB8MXwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxhYnN0cmFjdHxlbnwwfDF8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfDF8MHx8fDA%3D"
  ]

  return imageUrls[Math.random() * imageUrls.length | 0]
}