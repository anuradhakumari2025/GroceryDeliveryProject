import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import ProductList from "../../pages/seller/ProductList";
// import { toast } from "react-hot-toast";
import { vi, describe, test, expect } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockFetchProducts = vi.fn();
const mockSetProducts = vi.fn();

const mockAxios = {
  get: vi.fn(),
  delete: vi.fn(),
  post: vi.fn(),
};

vi.mock("../../context/AppContext", () => ({
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
        price: 140,
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

    expect(screen.getByText("Eggs")).toBeInTheDocument();
  });
});
