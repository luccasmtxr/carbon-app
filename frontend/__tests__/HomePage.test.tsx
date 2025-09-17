import { render, screen, act } from "@testing-library/react";
import HomePage from "../app/home/HomePage";

jest.mock("../app/action", () => ({
  submitFootprint: jest.fn().mockResolvedValue({ result: null }),
}));

describe("HomePage", () => {
  it("renders the title", async () => {
    await act(async () => {
      render(<HomePage />);
    });

    expect(
      screen.getByText(/Personal Carbon Footprint Calculator/i)
    ).toBeInTheDocument();
  });
});
