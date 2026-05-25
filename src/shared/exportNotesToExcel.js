import XLSX from 'xlsx-js-style';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';

const STATUS_ORDER = {
  progress: 'In Progress',
  pending: 'Pending',
  completed: 'Completed',
};

export const exportNotesToExcel = async (
  notes,
  setIsErrorModalVisible,
  setErrorMessage,
) => {
  try {
    const formattedNotes = notes.map(note => ({
      Title: note.title || '',
      Description: note.description || '',
      Status: STATUS_ORDER[note.status] || note.status || '',
      Starred: note.is_starred ? 'Yes' : 'No',
      Deadline: note.deadline || '',
      CreatedAt: note.created_at || '',
    }));

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedNotes);

    // =========================
    // HEADER STYLING
    // =========================

    const headers = Object.keys(formattedNotes[0] || {});

    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({
        r: 0,
        c: index,
      });

      if (!worksheet[cellAddress]) return;

      worksheet[cellAddress].s = {
        font: {
          bold: true,
          color: {
            rgb: 'FFFFFF',
          },
          sz: 12,
        },

        alignment: {
          horizontal: 'center',
          vertical: 'center',
        },

        fill: {
          fgColor: {
            rgb: '2563EB',
          },
        },

        border: {
          top: {
            style: 'thin',
            color: { rgb: 'D1D5DB' },
          },
          bottom: {
            style: 'thin',
            color: { rgb: 'D1D5DB' },
          },
          left: {
            style: 'thin',
            color: { rgb: 'D1D5DB' },
          },
          right: {
            style: 'thin',
            color: { rgb: 'D1D5DB' },
          },
        },
      };
    });

    // =========================
    // BODY CELL STYLING
    // =========================

    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let row = 1; row <= range.e.r; row++) {
      for (let col = 0; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({
          r: row,
          c: col,
        });

        if (!worksheet[cellAddress]) continue;

        worksheet[cellAddress].s = {
          alignment: {
            vertical: 'top',
            wrapText: true,
          },

          border: {
            top: {
              style: 'thin',
              color: { rgb: 'E5E7EB' },
            },
            bottom: {
              style: 'thin',
              color: { rgb: 'E5E7EB' },
            },
            left: {
              style: 'thin',
              color: { rgb: 'E5E7EB' },
            },
            right: {
              style: 'thin',
              color: { rgb: 'E5E7EB' },
            },
          },
        };
      }
    }

    // =========================
    // COLUMN WIDTHS
    // =========================

    worksheet['!cols'] = [
      { wch: 30 }, // Title
      { wch: 60 }, // Description
      { wch: 18 }, // Status
      { wch: 12 }, // Starred
      { wch: 18 }, // Deadline
      { wch: 24 }, // CreatedAt
    ];

    // =========================
    // ROW HEIGHTS
    // =========================

    worksheet['!rows'] = [
      { hpt: 28 }, // Header row
    ];

    // =========================
    // FREEZE HEADER ROW
    // =========================

    worksheet['!freeze'] = {
      xSplit: 0,
      ySplit: 1,
    };

    // =========================
    // AUTO FILTER
    // =========================

    worksheet['!autofilter'] = {
      ref: worksheet['!ref'],
    };

    // Append worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Notes');

    // Generate workbook output
    const wbOut = XLSX.write(workbook, {
      type: 'base64',
      bookType: 'xlsx',
    });

    const dir = ReactNativeBlobUtil.fs.dirs;

    const path = `${dir.CacheDir}/notes.xlsx`;

    // Write file
    await ReactNativeBlobUtil.fs.writeFile(path, wbOut, 'base64');

    const exists = await ReactNativeBlobUtil.fs.exists(path);

    console.log('PATH =>', path);
    console.log('FILE EXISTS =>', exists);

    if (!exists) {
      throw new Error('Excel file was not created');
    }

    // Open file
    await Share.open({
      title: 'Export Notes',
      url: `file://${path}`,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      filename: 'notes',
      subject: 'Exported Notes',
      failOnCancel: false,
      saveToFiles: true,
      useInternalStorage: false,
    });
  } catch (error) {
    setIsErrorModalVisible(true);
    setErrorMessage({
      title: 'Error',
      description:
        error?.message ||
        "We're currently unable to export notes, please try again later",
    });
  }
};
