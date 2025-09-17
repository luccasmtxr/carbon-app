import { render, screen, act, fireEvent } from "@testing-library/react";
import HomePage from "../app/home/HomePage";

jest.mock("../app/action", () => ({
  submitFootprint: jest.fn().mockResolvedValue({ result: null }),
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const renderWithAct = async () => {
    await act(async () => {
      render(<HomePage />);
      jest.runAllTimers(); // flush debounce timers
    });
  };

  it("renders the title", async () => {
    await renderWithAct();
    expect(
      screen.getByText(/Personal Carbon Footprint Calculator/i)
    ).toBeInTheDocument();
  });

  it("renders all stepper labels", async () => {
    await renderWithAct();
    for (const step of ["Housing", "Travel", "Food", "Products", "Services"]) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
  });

  it("shows the Housing fields by default", async () => {
    await renderWithAct();
    expect(screen.getByLabelText(/Electricity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Natural Gas/i)).toBeInTheDocument();
  });

  it("switches to Travel step when clicked", async () => {
    await renderWithAct();
    const travelBtn = screen.getByText("Travel");
    await act(async () => {
      fireEvent.click(travelBtn);
      jest.runAllTimers();
    });
    expect(screen.getByLabelText(/Vehicle/i)).toBeInTheDocument();
  });

  it("updates household size setting", async () => {
    await renderWithAct();
    const input = screen.getByLabelText(/Number of persons in household/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: "3" } });
      jest.runAllTimers();
    });
    expect(input).toHaveValue(3);
  });

  it("shows placeholder in results before any data", async () => {
    await renderWithAct();
    expect(screen.getByText(/No data yet/i)).toBeInTheDocument();
  });
});
