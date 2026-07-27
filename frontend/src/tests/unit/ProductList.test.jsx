import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import ProductList from "../../pages/seller/ProductList";
// import { toast } from "react-hot-toast";
import { jest, describe, test, expect } from "@jest/globals";

const mockNavigate = jest.fn();

jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockFetchProducts = jest.fn();
const mockSetProducts = jest.fn();

const mockAxios = {
  get: jest.fn(),
  delete: jest.fn(),
  post: jest.fn(),
};

jest.mock("../../context/AppContext", () => ({
  useAppContext: () => ({
    currency: "₹",
    navigate: mockNavigate,
    fetchProducts: mockFetchProducts,
    setProducts: mockSetProducts,
    axios: mockAxios,

    products: [
      {
        _id: "1",
        name: "Eggs",
        category: "Dairy",
        offerPrice: 120,
        image: [
          "C://vsCodeFolder/GroceryDeliveryProject/frontend/src/assets/greencart_assets/eggs_image.png",
        ],
        inStock: true,
      },
    ],
  }),
}));

describe("ProductList", () => {
  test("renders product name", () => {
    render(<ProductList />);

    expect(screen.getByText("Apple")).toBeInTheDocument();
  });
});
