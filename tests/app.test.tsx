import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { QuoteForm } from "../src/components/QuoteForm";
import { Header } from "../src/components/Header";
import { business, services } from "../src/data";

const initialSelection = { name: "", key: 0 };
async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Full name *"), "Demo Visitor");
  await user.type(screen.getByLabelText("Email *"), "demo@example.com");
  await user.type(screen.getByLabelText("Telephone *"), "07700 900123");
  await user.type(screen.getByLabelText("Postcode *"), "IG1 1AA");
  await user.selectOptions(
    screen.getByLabelText("Cleaning service *"),
    "Deep Cleaning",
  );
  await user.selectOptions(screen.getByLabelText("Property type *"), "House");
  return user;
}

describe("quote enquiry demonstration", () => {
  it("rejects empty submission with accessible errors and focuses the first field", async () => {
    render(<QuoteForm selectedService={initialSelection} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Preview Your Quote Request" }),
    );
    expect(
      screen
        .getAllByRole("textbox")
        .filter((el) => el.getAttribute("aria-invalid") === "true"),
    ).toHaveLength(4);
    expect(screen.getByLabelText("Full name *")).toHaveFocus();
    expect(screen.getByLabelText("Full name *")).toHaveAccessibleDescription(
      "Please enter your full name.",
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("rejects malformed email, telephone and postcode without losing entered details", async () => {
    render(<QuoteForm selectedService={initialSelection} />);
    const user = await fillValidForm();
    for (const [label, value] of [
      ["Email *", "invalid-email"],
      ["Telephone *", "abc"],
      ["Postcode *", "12345"],
    ]) {
      await user.clear(screen.getByLabelText(label));
      await user.type(screen.getByLabelText(label), value);
    }
    await user.click(
      screen.getByRole("button", { name: "Preview Your Quote Request" }),
    );
    expect(screen.getByLabelText("Email *")).toHaveFocus();
    expect(
      screen.getByText("Please enter a valid email address."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a valid telephone number."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a valid UK postcode."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Full name *")).toHaveValue("Demo Visitor");
  });

  it("rejects a date in the past", async () => {
    render(<QuoteForm selectedService={initialSelection} />);
    const user = await fillValidForm();
    fireEvent.change(screen.getByLabelText(/Preferred date/), {
      target: { value: "2000-01-01" },
    });
    await user.click(
      screen.getByRole("button", { name: "Preview Your Quote Request" }),
    );
    expect(
      screen.getByText("Please choose today or a future date."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred date/)).toHaveFocus();
  });

  it("shows an explicit demo confirmation, clears entries and makes no network or storage calls", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("Unexpected network call"));
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    const xhrSpy = vi.spyOn(XMLHttpRequest.prototype, "send");
    render(<QuoteForm selectedService={initialSelection} />);
    const user = await fillValidForm();
    await user.click(
      screen.getByRole("button", { name: "Preview Your Quote Request" }),
    );
    expect(screen.getByRole("status")).toHaveFocus();
    expect(
      screen.getByText(/Nothing was sent to Lorena, saved or booked/),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();
    expect(xhrSpy).not.toHaveBeenCalled();
    await user.click(
      screen.getByRole("button", { name: "Try the form again" }),
    );
    expect(screen.getByLabelText("Full name *")).toHaveValue("");
    expect(screen.getByLabelText("Email *")).toHaveValue("");
    expect(screen.getByLabelText("Cleaning service *")).toHaveValue("");
  });

  it("reopens the form with the selected service after completing a previous demo", async () => {
    const { rerender } = render(
      <QuoteForm selectedService={initialSelection} />,
    );
    const user = await fillValidForm();
    await user.click(
      screen.getByRole("button", { name: "Preview Your Quote Request" }),
    );
    rerender(<QuoteForm selectedService={{ name: "Deep Cleaning", key: 1 }} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Cleaning service *")).toHaveValue(
      "Deep Cleaning",
    );
  });
});

describe("navigation and page content", () => {
  it("opens mobile navigation, closes it with Escape and restores button focus", async () => {
    render(<Header />);
    const user = userEvent.setup();
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    expect(document.getElementById("mobile-nav")).not.toBeVisible();
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeVisible();
    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    await user.click(toggle);
    await user.click(
      within(
        screen.getByRole("navigation", { name: "Mobile navigation" }),
      ).getByText("Services"),
    );
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("selects every service from its enquiry link and resolves every internal anchor", async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    for (const service of services) {
      await user.click(
        screen.getByRole("link", { name: `Enquire about ${service.name}` }),
      );
      expect(screen.getByLabelText("Cleaning service *")).toHaveValue(
        service.name,
      );
    }
    for (const anchor of container.querySelectorAll('a[href^="#"]')) {
      expect(
        document.getElementById(anchor.getAttribute("href")!.slice(1)),
      ).not.toBeNull();
    }
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByText(/not affiliated with or endorsed by/),
    ).toBeInTheDocument();
  });

  it("uses the supplied contact destinations and explicitly labels unverified WhatsApp", () => {
    render(<App />);
    expect(
      screen.getByRole("link", { name: /Give Lorena a call/ }),
    ).toHaveAttribute("href", business.tel);
    expect(screen.getByRole("link", { name: /Send an email/ })).toHaveAttribute(
      "href",
      `mailto:${business.email}`,
    );
    expect(screen.getByRole("link", { name: /Try WhatsApp/ })).toHaveAttribute(
      "href",
      "https://wa.me/447831039380",
    );
    expect(
      screen.getByText("Account availability unverified"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /original public profile on Nextdoor/ }),
    ).toHaveAttribute("href", business.nextdoor);
  });
});
