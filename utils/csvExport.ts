import { StudentRecord } from '../services/firebaseService';

/**
 * Converts student records to CSV and triggers a download.
 */
export const exportToCSV = (data: StudentRecord[]) => {
    // Define headers
    const headers = [
        "Student Name",
        "Lessons Completed",
        "Average Speaking",
        "Average Writing",
        "Last Practice",
        "Speaking Scores (Raw)",
        "Writing Scores (Raw)"
    ];

    // Map data to rows
    const rows = data.map(record => {
        const stats = record.stats;

        const speakingAvg = stats.speakingScore.length > 0
            ? (stats.speakingScore.reduce((a, b) => a + b, 0) / stats.speakingScore.length).toFixed(2)
            : "0";

        const writingAvg = stats.writingScore.length > 0
            ? (stats.writingScore.reduce((a, b) => a + b, 0) / stats.writingScore.length).toFixed(2)
            : "0";

        // Raw scores are joined by semicolon to not break CSV
        const speakingRaw = stats.speakingScore.join(";");
        const writingRaw = stats.writingScore.join(";");

        return [
            `"${record.name}"`,
            stats.lessonsCompleted,
            speakingAvg,
            writingAvg,
            stats.lastPractice ? stats.lastPractice : "Never",
            `"${speakingRaw}"`,
            `"${writingRaw}"`
        ];
    });

    // Combine headers and rows
    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
    ].join("\n");

    // Create blobs and download
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const timestamp = new Date().toISOString().split('T')[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `student_data_backup_${timestamp}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
