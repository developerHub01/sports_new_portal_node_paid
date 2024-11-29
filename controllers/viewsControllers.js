const { format } = require("date-fns");
const NewsServices = require("../services/newsServices");

class ViewsControllers {
  async index(req, res) {
    let { data } = req;

    const newsList = await NewsServices.index();

    const carouselSlides = [
      {
        id: 1,
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        title: "Summer Sale",
        description:
          "Get ready for the best summer deals! Shop now for discounts on all items.",
        link: "/news/1",
      },
      {
        id: 2,
        banner:
          "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        title: "New Arrivals",
        description:
          "Discover our latest collection of fashion and accessories.",
        link: "/news/2",
      },
      {
        id: 3,
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        title: "Exclusive Offers",
        description:
          "Limited time offers just for you! Don’t miss out on amazing discounts.",
        link: "/news/3",
      },
      {
        id: 4,
        banner:
          "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
        title: "Holiday Specials",
        description:
          "Celebrate the holidays with special deals and gifts for everyone.",
        link: "/news/4",
      },
    ];

    const pagination = {
      currentPage: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.perPage) || 10,
      totalPage: 3,
    };

    data = {
      ...data,
      newsList,
      carouselSlides,
      pagination,
    };

    console.log(data);

    return res.render("pages/index", data);
  }

  async login(req, res) {
    if (req.user) return res.redirect("/");

    return res.render("pages/login");
  }

  async register(req, res) {
    if (req.user) return res.redirect("/");

    res.render("pages/register");
  }

  async dashboard(req, res) {
    let { data } = req;

    res.render("pages/dashboard", data);
  }

  async profile(req, res) {
    let { data } = req;

    res.render("pages/profile", data);
  }

  async category(req, res) {
    const { categoryName } = req.params;
    let { data } = req;

    const newsList = [
      {
        id: 1,
        title: "Shoes!",
        categoryName: "Football",
        description: "If a dog chews shoes whose shoes does he choose?",
        banner:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        link: "/news/1",
      },
      {
        id: 2,
        title: "Summer Sale",
        categoryName: "Cricket",
        description: "Get ready for the hottest deals of the season.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        link: "/news/2",
      },
      {
        id: 3,
        title: "New Arrivals",
        categoryName: "Basketball",
        description: "Check out the latest arrivals in our store.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        link: "/news/3",
      },
      {
        id: 4,
        title: "Exclusive Offers",
        categoryName: "Tennis",
        description: "Unlock exclusive offers and discounts today.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        link: "/news/4",
      },
      {
        id: 5,
        title: "Holiday Specials",
        categoryName: "Hockey",
        description: "Celebrate the holidays with amazing deals.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
        link: "/news/5",
      },
      {
        id: 6,
        title: "Grand Opening",
        categoryName: "Rugby",
        description:
          "We're excited to announce the grand opening of our new store.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609600289513-b7e88b7d9e7c.webp",
        link: "/news/6",
      },
      {
        id: 7,
        title: "Winter Collection",
        categoryName: "Athletics",
        description:
          "The winter collection is now available! Get cozy with our latest arrivals.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        link: "/news/7",
      },
      {
        id: 8,
        title: "Black Friday Deals",
        categoryName: "Baseball",
        description: "Huge discounts on Black Friday! Shop now and save big.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609600289513-b7e88b7d9e7c.webp",
        link: "/news/8",
      },
      {
        id: 9,
        title: "New Features Released",
        categoryName: "Golf",
        description:
          "We’ve just released new features on our platform! Check them out.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        link: "/news/9",
      },
      {
        id: 10,
        title: "Spring Preview",
        categoryName: "Cycling",
        description:
          "Get a sneak peek at the spring collection launching soon.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        link: "/news/10",
      },
      {
        id: 11,
        title: "Flash Sale Today!",
        categoryName: "Swimming",
        description:
          "Don’t miss out on our one-day flash sale. Everything must go!",
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        link: "/news/11",
      },
      {
        id: 12,
        title: "Free Shipping",
        categoryName: "Boxing",
        description: "Enjoy free shipping on all orders this week only!",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        link: "/news/12",
      },
      {
        id: 13,
        title: "New Product Launch",
        categoryName: "Badminton",
        description:
          "We're launching a brand new product! Be the first to try it.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        link: "/news/13",
      },
      {
        id: 14,
        title: "Customer Appreciation Day",
        categoryName: "Wrestling",
        description:
          "Join us for Customer Appreciation Day and enjoy special offers.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
        link: "/news/14",
      },
      {
        id: 15,
        title: "Tech Talk Webinar",
        categoryName: "Table Tennis",
        description: "Sign up for our free webinar on the latest tech trends.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        link: "/news/15",
      },
      {
        id: 16,
        title: "Back to School",
        categoryName: "Skiing",
        description:
          "Get ready for the school season with our back-to-school specials.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        link: "/news/16",
      },
      {
        id: 17,
        title: "Weekend Sale",
        categoryName: "Surfing",
        description:
          "Our weekend sale is live! Save big on your favorite items.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        link: "/news/17",
      },
      {
        id: 18,
        title: "Exclusive Event",
        categoryName: "Skating",
        description:
          "Join us for an exclusive event and get early access to new products.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        link: "/news/18",
      },
      {
        id: 19,
        title: "Join Our Newsletter",
        categoryName: "Volleyball",
        description:
          "Sign up for our newsletter and stay updated with the latest news.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
        link: "/news/19",
      },
      {
        id: 20,
        title: "Autumn Collection",
        categoryName: "Fencing",
        description: "Fall in love with our new autumn collection. Shop now!",
        banner:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        link: "/news/20",
      },
    ];

    const pagination = {
      currentPage: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.perPage) || 10,
      totalPage: 3,
    };

    data = {
      ...data,
      categoryName,
      newsList,
      pagination,
    };

    return res.render("pages/category", data);
  }

  async newsById(req, res) {
    const { newsId } = req.params;
    let { data } = req;

    const newsList = [
      {
        id: 1,
        title: "Shoes!",
        categoryName: "Football",
        description: "If a dog chews shoes whose shoes does he choose?",
        banner:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        link: "/news/1",
      },
      {
        id: 2,
        title: "Summer Sale",
        categoryName: "Cricket",
        description: "Get ready for the hottest deals of the season.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        link: "/news/2",
      },
      {
        id: 3,
        title: "New Arrivals",
        categoryName: "Basketball",
        description: "Check out the latest arrivals in our store.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        link: "/news/3",
      },
      {
        id: 4,
        title: "Exclusive Offers",
        categoryName: "Tennis",
        description: "Unlock exclusive offers and discounts today.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        link: "/news/4",
      },
      {
        id: 5,
        title: "Holiday Specials",
        categoryName: "Hockey",
        description: "Celebrate the holidays with amazing deals.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
        link: "/news/5",
      },
      {
        id: 6,
        title: "Grand Opening",
        categoryName: "Rugby",
        description:
          "We're excited to announce the grand opening of our new store.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609600289513-b7e88b7d9e7c.webp",
        link: "/news/6",
      },
      {
        id: 7,
        title: "Winter Collection",
        categoryName: "Athletics",
        description:
          "The winter collection is now available! Get cozy with our latest arrivals.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        link: "/news/7",
      },
      {
        id: 8,
        title: "Black Friday Deals",
        categoryName: "Baseball",
        description: "Huge discounts on Black Friday! Shop now and save big.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609600289513-b7e88b7d9e7c.webp",
        link: "/news/8",
      },
      {
        id: 9,
        title: "New Features Released",
        categoryName: "Golf",
        description:
          "We’ve just released new features on our platform! Check them out.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        link: "/news/9",
      },
      {
        id: 10,
        title: "Spring Preview",
        categoryName: "Cycling",
        description:
          "Get a sneak peek at the spring collection launching soon.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        link: "/news/10",
      },
      {
        id: 11,
        title: "Flash Sale Today!",
        categoryName: "Swimming",
        description:
          "Don’t miss out on our one-day flash sale. Everything must go!",
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        link: "/news/11",
      },
      {
        id: 12,
        title: "Free Shipping",
        categoryName: "Boxing",
        description: "Enjoy free shipping on all orders this week only!",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        link: "/news/12",
      },
      {
        id: 13,
        title: "New Product Launch",
        categoryName: "Badminton",
        description:
          "We're launching a brand new product! Be the first to try it.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        link: "/news/13",
      },
      {
        id: 14,
        title: "Customer Appreciation Day",
        categoryName: "Wrestling",
        description:
          "Join us for Customer Appreciation Day and enjoy special offers.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
        link: "/news/14",
      },
      {
        id: 15,
        title: "Tech Talk Webinar",
        categoryName: "Table Tennis",
        description: "Sign up for our free webinar on the latest tech trends.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        link: "/news/15",
      },
      {
        id: 16,
        title: "Back to School",
        categoryName: "Skiing",
        description:
          "Get ready for the school season with our back-to-school specials.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
        link: "/news/16",
      },
      {
        id: 17,
        title: "Weekend Sale",
        categoryName: "Surfing",
        description:
          "Our weekend sale is live! Save big on your favorite items.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
        link: "/news/17",
      },
      {
        id: 18,
        title: "Exclusive Event",
        categoryName: "Skating",
        description:
          "Join us for an exclusive event and get early access to new products.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
        link: "/news/18",
      },
      {
        id: 19,
        title: "Join Our Newsletter",
        categoryName: "Volleyball",
        description:
          "Sign up for our newsletter and stay updated with the latest news.",
        banner:
          "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
        link: "/news/19",
      },
      {
        id: 20,
        title: "Autumn Collection",
        categoryName: "Fencing",
        description: "Fall in love with our new autumn collection. Shop now!",
        banner:
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
        link: "/news/20",
      },
    ];

    const article = {
      id: 1,
      title: "The Impact of Climate Change on Football",
      banner:
        "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=1449&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel orci ac arcu condimentum lobortis. Donec vel nisl et massa consectetur tincidunt. Curabitur vulputate, tortor id placerat fermentum, eros nisi faucibus lectus, vel consectetur nisi lectus vel velit. In hac habitasse platea dictumst. Sed malesuada, justo vel consectetur semper, justo nunc pellentesque neque, vel viverra felis velit nec velit. Donec sagittis, felis sed ornare finibus, ipsum lectus tincidunt diam, in efficitur velit ligula vel neque. Sed tincidunt, est at consectetur ullamcorper, neque velit facilisis nunc, at efficitur felis neque ut sem.",
      createdAt: format(new Date(), "MM/dd/yyyy"),
      updatedAt: format(new Date(), "MM/dd/yyyy"),
      categoryName: "football",
    };

    data = {
      ...data,
      newsId,
      newsList,
      article,
    };

    return res.render("pages/news", data);
  }
}

module.exports = new ViewsControllers();
