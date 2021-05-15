const routes = {
  dashboard: [
    {
      section: "Navigation",
      items: [
        {
          name: "Home",
          link: "/dashboard",
          icon: "fas fa-home",
        },
        {
          name: "Sliders",
          link: "/sliders",
          icon: "fas fa-sliders-h",
        },
        {
          name: "HomePage Manager",
          link: "/homepage-manager",
          icon: "far fa-clone",
        },
      ],
    },
    {
      section: "Products",
      items: [
        {
          name: "Products",
          link: "/productlist",
          icon: "fas fa-gifts",
          children: [
            {
              name: "Products",
              link: "/productlist",
            },
            {
              name: "Special Offers",
              link: "/create/product",
            },
            {
              name: "Pending Products",
              link: "/create/product",
            },
            {
              name: "Expired Products",
              link: "/create/product",
            },
            {
              name: "Add Product",
              link: "/create/product",
            },
          ],
        },
        {
          name: "Featured Products",
          link: "/featured-productlist",
          icon: "fas fa-dollar-sign",
          children: [
            {
              name: "Products",
              link: "/featured-productlist",
            },
            {
              name: "Translactions",
              link: "/featured-translactionList",
            },
          ],
        },
        {
          name: "Categories",
          link: "/categoryList",
          icon: "fas fa-shapes",
          children: [
            {
              name: "Categories",
              link: "/categoryList",
            },
            {
              name: "Add Category",
              link: "/create/category",
            },
          ],
        },
        {
          name: "Brands",
          link: "/brandList",
          icon: "fab fa-delicious",
          children: [
            {
              name: "Brands",
              link: "/brandList",
            },
            {
              name: "Add Brand",
              link: "/create/brand",
            },
          ],
        },
      ],
    },
    {
      section: "Orders",
      items: [
        {
          name: "Orders",
          link: "/orderlist",
          icon: "fas fa-shopping-cart",
          children: [
            {
              name: "Orders",
              link: "/orderlist",
            },
            {
              name: "Translactions",
              link: "/translactionList",
            },
            {
              name: "Invoices",
              link: "/invoiceList",
            },
          ],
        },
        {
          name: "Digital Sales",
          link: "/saleList",
          icon: "fas fa-weight-hanging",
        },
        {
          name: "Earnings",
          link: "/earningList",
          icon: "fas fa-money-bill-alt",
        },
      ],
    },
    {
      section: "Content",
      items: [
        {
          name: "Pages",
          link: "/pagelist",
          icon: "fas fa-file",
          children: [
            {
              name: "Pages",
              link: "/pagelist",
            },
            {
              name: "Add Page",
              link: "/create/page",
            },
          ],
        },
        {
          name: "Blogs",
          link: "/blogList",
          icon: "fas fa-file-alt",
          children: [
            {
              name: "Blogs",
              link: "/blogList",
            },
            {
              name: "Add Post",
              link: "/create/post",
            },
            {
              name: "Categories Post",
              link: "/categories-post",
            },
          ],
        },
        {
          name: "Location",
          link: "/locationList",
          icon: "fas fa-map-marker-alt",
          children: [
            {
              name: "Countries",
              link: "/countryList",
            },
            {
              name: "States",
              link: "/stateList",
            },
            {
              name: "Cities",
              link: "/cityList",
            },
          ],
        },
      ],
    },
    {
      section: "Membership",
      items: [
        {
          name: "Membership",
          link: "/membershiplist",
          icon: "fas fa-user-shield",
          children: [
            {
              name: "Membership Plans",
              link: "/membership-planlist",
            },
            {
              name: "Translactions",
              link: "/membership-translactionlist",
            },
          ],
        },
        {
          name: "Shop Opening Requests",
          link: "/open-requestList",
          icon: "fas fa-exclamation-circle",
        },
        {
          name: "Users",
          link: "/userList",
          icon: "fas fa-users",
          children: [
            {
              name: "Administrators",
              link: "/userList",
            },
            {
              name: "Sellers",
              link: "/sellerlist",
            },
            {
              name: "Customers",
              link: "/customerlist",
            },
            {
              name: "Add Administrator",
              link: "/create/admin",
            },
          ],
        },
      ],
    },
    {
      section: "Management Tools",
      items: [
        {
          name: "Contact Messages",
          link: "/contact-messagelist",
          icon: "fas fa-paper-plane",
        },
        {
          name: "Reviews",
          link: "/reviewlist",
          icon: "fas fa-star",
        },
        {
          name: "Comments",
          link: "/commentlist",
          icon: "fas fa-comments",
          children: [
            {
              name: "Product Comments",
              link: "/product-commentlist",
            },
            {
              name: "Blog Comments",
              link: "/blog-commentlist",
            },
          ],
        },
        {
          name: "Abuse Reports",
          link: "/abuse-reportlist",
          icon: "fas fa-exclamation-triangle",
        },
        {
          name: "Newsletters",
          link: "/newsletterlist",
          icon: "fas fa-mail-bulk",
          children: [
            {
              name: "Subcribers",
              link: "/subcriberlist",
            },
            {
              name: "Send Email to Subcribers",
              link: "/send-subcriber-email",
            },
          ],
        },
      ],
    },
    {
      section: "Settings",
      items: [
        {
          name: "Preferences",
          link: "/preferences",
          icon: "fas fa-check-circle",
        },
      ],
    },
  ],
};

export default routes;