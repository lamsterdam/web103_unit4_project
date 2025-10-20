// cahnging to foreign key approach for cleaner and more scalable design
// 🌿 Pots (reference other tables by ID)
export const potData = [
  {
    pot_id: 1,
    name: "Simple Lover",
    exterior_id: 1,   // Terracotta Orange
    shape_id: 1,      // Round
    drainage_id: 1,   // Drainage Holes
    material_id: 1,   // Ceramic
  },
  {
    pot_id: 2,
    name: "Urban Minimalist",
    exterior_id: 2,   // Black
    shape_id: 3,      // Cylinder
    drainage_id: 2,   // Double Pot System
    material_id: 1,   // Ceramic
  },
  {
    pot_id: 3,
    name: "Glass Bloom",
    exterior_id: 3,   // Clear
    shape_id: 2,      // Square
    drainage_id: 4,   // Elevated Containers
    material_id: 2,   // Glass
  },
  {
    pot_id: 4,
    name: "Forest Whisper",
    exterior_id: 4,   // Moss Green
    shape_id: 1,      // Round
    drainage_id: 1,   // Drainage Holes
    material_id: 3,   // Clay
  },
  {
    pot_id: 5,
    name: "Zen Stone",
    exterior_id: 5,   // Granite Gray
    shape_id: 4,      // Bowl
    drainage_id: 5,   // No Drainage
    material_id: 4,   // Concrete
  },
  {
    pot_id: 6,
    name: "Luna Shine",
    exterior_id: 6,   // Pearl White
    shape_id: 3,      // Cylinder
    drainage_id: 1,   // Drainage Holes
    material_id: 1,   // Ceramic
  },
  {
    pot_id: 7,
    name: "Rustic Roots",
    exterior_id: 7,   // Brown Speckle
    shape_id: 1,      // Round
    drainage_id: 1,   // Drainage Holes
    material_id: 5,   // Terracotta
  },
  {
    pot_id: 8,
    name: "Skyline Chic",
    exterior_id: 8,   // Slate Blue
    shape_id: 5,      // Hexagonal
    drainage_id: 2,   // Double Pot System
    material_id: 6,   // Plastic
  },
  {
    pot_id: 9,
    name: "Amber Wave",
    exterior_id: 9,   // Amber Gloss
    shape_id: 4,      // Bowl
    drainage_id: 6,   // Drainage Tray
    material_id: 1,   // Ceramic
  },
  {
    pot_id: 10,
    name: "Eco Bloom",
    exterior_id: 10,  // Natural Beige
    shape_id: 1,      // Round
    drainage_id: 1,   // Drainage Holes
    material_id: 7,   // Biodegradable Fiber
  }
];


// 🎨 Exteriors
export const exteriorData = [
  { exterior_id: 1, name: "Terracotta Orange", image: "https://i.pinimg.com/736x/2c/92/80/2c9280c02adb95f4388ccbd59b2b4a56--upholstery-fabrics-terracotta.jpg", price: "$5.00" },
  { exterior_id: 2, name: "Black", image: "", price: "$8.00" },
  { exterior_id: 3, name: "Clear", image: "https://images.freecreatives.com/wp-content/uploads/2016/02/Baby-Blue-Paper-Background-with-Flecks.jpg", price: "$5.00" },
  { exterior_id: 4, name: "Moss Green", image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/solid-moss-green-color-garaga-designs.jpg", price: "$10.00" },
  { exterior_id: 5, name: "Granite Gray", image: "https://www.icolorpalette.com/download/solidcolorimage/656667_solid_color_background_icolorpalette.png", price: "$10.00" },
  { exterior_id: 6, name: "Pearl White", image: "https://www.icolorpalette.com/download/solidcolorimage/f3f2ed_solid_color_background_icolorpalette.png", price: "$4.00" },
  { exterior_id: 7, name: "Brown Speckle", image: "https://png.pngtree.com/thumb_back/fh260/background/20231130/pngtree-textured-brown-paper-with-speckled-noise-pattern-image_13817000.png", price: "$8.00" },
  { exterior_id: 8, name: "Slate Blue", image: "https://www.neenahpaper.com/-/media/images/storefront/chips/touche-papers/touche-papers-slate-blue-soft-touch.ashx", price: "$12.00" },
  { exterior_id: 9, name: "Amber Gloss", image: "https://www.icolorpalette.com/download/solidcolorimage/ffbf00_solid_color_background_icolorpalette.png", price: "$5.00" },
  { exterior_id: 10, name: "Natural Beige", image: "https://wallpapercave.com/wp/wp6879679.jpg", price: "$5.00" }
];


// 🧱 Shapes
export const shapeData = [
  { shape_id: 1, name: "Round", image: "https://www.pngkit.com/png/detail/162-1621661_circle-shapes-round-shape-flowchart-geometry-blank-circle.png", price: "$3.00" },
  { shape_id: 2, name: "Square", image: "https://www.freebiefindingmom.com/wp-content/uploads/2021/02/Free-Printable-Square-Shape.jpg", price: "$3.50" },
  { shape_id: 3, name: "Cylinder", image: "https://cdn5.vectorstock.com/i/1000x1000/47/79/cylinder-geometrical-figure-outline-icon-on-white-vector-28604779.jpg", price: "$4.00" },
  { shape_id: 4, name: "Bowl", image: "https://static.vecteezy.com/system/resources/previews/004/854/803/large_2x/bowl-line-icon-design-template-vector.jpg", price: "$4.50" },
  { shape_id: 5, name: "Hexagonal", image: "https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/hex_ver_1.png", price: "$5.00" }
];


// 💧 Drainage
export const drainageData = [
  { drainage_id: 1, name: "Drainage Holes", image: "https://thumbs.dreamstime.com/b/empty-flower-pots-plastic-garden-vase-brown-plant-container-cheap-disposable-flowerpot-pot-white-background-259762005.jpg", price: "$1.00" },
  { drainage_id: 2, name: "Double Pot System", image: "https://laidbackgardener.blog/wp-content/uploads/2016/10/20161003a.jpg", price: "$2.00" },
  { drainage_id: 4, name: "Elevated Containers", image: "https://tse2.mm.bing.net/th/id/OIP.RZFjwQVX8z-NRcrst1iCZQHaHa", price: "$2.50" },
  { drainage_id: 5, name: "No Drainage", image: "https://tse2.mm.bing.net/th/id/OIP.mUArRiqq6z6v20lkk5qNfQHaHA", price: "$0.00" },
  { drainage_id: 6, name: "Drainage Tray", image: "https://i5.walmartimages.com/asr/8649ca7d-d80a-4df0-9175-5b150e55064f.fe1b54781acaa8d8b019a472b870e551.jpeg", price: "$1.50" }
];


// 🪵 Materials
export const materialData = [
  { material_id: 1, name: "Ceramic", image: "https://m.media-amazon.com/images/I/81nhabKGtSL.jpg", price: "$10.00" },
  { material_id: 2, name: "Glass", image: "https://i.pinimg.com/originals/d2/28/1c/d2281c56a950052ceaf05940945e10ce.jpg", price: "$12.00" },
  { material_id: 3, name: "Clay", image: "https://i5.walmartimages.com/asr/36178d7d-ed04-4f1b-9564-5073de8b1671_1.849738ba569e13201265ab0261401114.jpeg", price: "$9.00" },
  { material_id: 4, name: "Concrete", image: "https://images.thdstatic.com/productImages/ab53bec1-d1fe-4af5-9e37-b3c5239ba94a/svn/raw-concrete-plant-pots-pa099a-8021-64_1000.jpg", price: "$11.00" },
  { material_id: 5, name: "Terracotta", image: "https://www.kinseyfamilyfarm.com/s/wp-content/uploads/terra-cotta/Usuki-Terra-Cotta-Planter.jpg", price: "$8.00" },
  { material_id: 6, name: "Plastic", image: "https://i5.walmartimages.com/asr/26ee93dd-878f-4b0b-8f71-9f66089f30db_1.a0c7a77c9e2192d587ffd8833fb9aa3b.jpeg", price: "$5.00" },
  { material_id: 7, name: "Biodegradable Fiber", image: "https://i.pinimg.com/originals/00/17/b7/0017b7df98525bcd40e1744d61ec1a7f.png", price: "$6.00" }
];
