import { render, screen } from "@testing-library/react"
import ProductCard from "../ProductCard"
import useSWR from "swr"

// Mock SWR
jest.mock("swr")
const mockUseSWR = useSWR

const mockProduct = {
  id: 1,
  name: "Test Product",
  price: 99,
  unit: "1 kg",
  image: "/test-image.jpg",
  description: "This is a test product description",
}

describe("ProductCard", () => {
  beforeEach(() => {
    // Mock SWR to return stock data
    mockUseSWR.mockReturnValue({
      data: [{ id: 1, productId: 1, quantity: 5 }],
      error: null,
      isLoading: false,
      mutate: jest.fn(),
      isValidating: false,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />)

    // Check if product name is rendered
    expect(screen.getByText("Test Product")).toBeInTheDocument()

    // Check if price is rendered correctly
    expect(screen.getByText("₹99")).toBeInTheDocument()

    // Check if unit is rendered
    expect(screen.getByText("1 kg")).toBeInTheDocument()

    // Check if description is rendered
    expect(screen.getByText("This is a test product description")).toBeInTheDocument()
  })

  it("displays stock level when showStock is true", () => {
    render(<ProductCard product={mockProduct} showStock={true} />)

    // Check if stock level is displayed
    expect(screen.getByText("Low stock: 5 left")).toBeInTheDocument()
  })

  it("does not display stock level when showStock is false", () => {
    render(<ProductCard product={mockProduct} showStock={false} />)

    // Check that stock level is not displayed
    expect(screen.queryByText("Low stock: 5 left")).not.toBeInTheDocument()
  })

  it("renders product image with correct alt text", () => {
    render(<ProductCard product={mockProduct} />)

    const image = screen.getByAltText("Test Product")
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", "/test-image.jpg")
  })

  it("handles out of stock scenario", () => {
    // Mock SWR to return out of stock
    mockUseSWR.mockReturnValue({
      data: [{ id: 1, productId: 1, quantity: 0 }],
      error: null,
      isLoading: false,
      mutate: jest.fn(),
      isValidating: false,
    })

    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText("Out of stock")).toBeInTheDocument()
  })

  it("handles loading state", () => {
    // Mock SWR to return loading state
    mockUseSWR.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      mutate: jest.fn(),
      isValidating: false,
    })

    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText("Loading stock...")).toBeInTheDocument()
  })

  it("handles error state", () => {
    // Mock SWR to return error state
    mockUseSWR.mockReturnValue({
      data: null,
      error: new Error("Failed to fetch"),
      isLoading: false,
      mutate: jest.fn(),
      isValidating: false,
    })

    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText("Stock unavailable")).toBeInTheDocument()
  })
})