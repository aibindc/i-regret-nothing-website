// Posts a signup email to the project's Google Apps Script Web App,
// which appends [timestamp, email] to the connected Google Sheet.
// Uses no-cors: the row is written, but the response is opaque (we can't
// read it), so callers should optimistically show success after resolve.
const ENDPOINT = "https://script.google.com/macros/s/AKfycbyHazIhKSRVSxiwc_eph7QTDWmJI19JG1n_81TmVT38293eZaKzEcQVrxNcJyAx-w/exec";

export async function subscribe(email) {
  try {
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ email: email }),
    });
    return true;
  } catch (err) {
    // Network failures are swallowed so the UI still confirms;
    // the Apps Script call is fire-and-forget.
    console.warn("subscribe failed", err);
    return false;
  }
}
