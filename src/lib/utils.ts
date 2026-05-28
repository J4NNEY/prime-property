/**
 * Format harga ke format Rupiah Indonesia
 * Contoh: 1350000000 → "Rp 1.350.000.000"
 */
export function formatRupiah(amount: number | bigint): string {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  return `Rp ${num.toLocaleString("id-ID")}`;
}

/**
 * Format tanggal ke format Indonesia
 * Contoh: "24 Mei 2026"
 */
export function formatTanggal(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

/**
 * Format dimensi properti
 */
export function formatDimensi(lebar: number, panjang: number): string {
  return `${lebar} × ${panjang} m`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Serialize BigInt for JSON
 */
export function serializeProperty(property: Record<string, unknown>) {
  return JSON.parse(
    JSON.stringify(property, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}
