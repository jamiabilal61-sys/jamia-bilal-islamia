import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function getRequiredEnvironmentVariable(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} موجود نہیں ہے۔`);
  }

  return value;
}

export async function POST(request: Request) {
  let uploadedFilePath: string | null = null;

  try {
    const supabaseUrl =
      getRequiredEnvironmentVariable("SUPABASE_URL");

    const supabaseSecretKey =
      getRequiredEnvironmentVariable("SUPABASE_SECRET_KEY");

    const supabase = createClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const formData = await request.formData();

    const studentName = String(
      formData.get("studentName") ?? ""
    ).trim();

    const fatherName = String(
      formData.get("fatherName") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ?? ""
    ).trim();

    const dateOfBirth = String(
      formData.get("dateOfBirth") ?? ""
    ).trim();

    const gender = String(
      formData.get("gender") ?? ""
    ).trim();

    const department = String(
      formData.get("className") ?? ""
    ).trim();

    const address = String(
      formData.get("address") ?? ""
    ).trim();

    const studentImage = formData.get("studentImage");

    if (
      !studentName ||
      !fatherName ||
      !phone ||
      !dateOfBirth ||
      !gender ||
      !department ||
      !address
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "براہِ کرم تمام ضروری معلومات مکمل کریں۔",
        },
        {
          status: 400,
        }
      );
    }

    if (!["مرد", "عورت"].includes(gender)) {
      return NextResponse.json(
        {
          success: false,
          message: "جنس کا انتخاب درست نہیں ہے۔",
        },
        {
          status: 400,
        }
      );
    }

    if (
      studentImage instanceof File &&
      studentImage.size > 0
    ) {
      if (!allowedImageTypes.includes(studentImage.type)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "صرف JPG، PNG یا WEBP تصویر منتخب کریں۔",
          },
          {
            status: 400,
          }
        );
      }

      if (studentImage.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message:
              "تصویر کا زیادہ سے زیادہ سائز 5MB ہوسکتا ہے۔",
          },
          {
            status: 400,
          }
        );
      }

      const extension =
        studentImage.name.split(".").pop()?.toLowerCase() ||
        "jpg";

      const safeExtension = ["jpg", "jpeg", "png", "webp"].includes(
        extension
      )
        ? extension
        : "jpg";

      uploadedFilePath =
        `student-images/${crypto.randomUUID()}.${safeExtension}`;

      const imageBuffer = await studentImage.arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from("admission-documents")
        .upload(uploadedFilePath, imageBuffer, {
          contentType: studentImage.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);

        return NextResponse.json(
          {
            success: false,
            message:
              "طالب علم کی تصویر محفوظ نہیں ہوسکی۔",
          },
          {
            status: 500,
          }
        );
      }
    }

    const { data, error: databaseError } = await supabase
      .from("admissions")
      .insert({
        student_name: studentName,
        father_name: fatherName,
        phone,
        email: email || null,
        date_of_birth: dateOfBirth,
        gender,
        department,
        address,
        student_image_url: uploadedFilePath,
        status: "زیر غور",
      })
      .select(
        "id, admission_number, student_name, status, created_at"
      )
      .single();

    if (databaseError) {
      console.error("Database error:", databaseError);

      if (uploadedFilePath) {
        await supabase.storage
          .from("admission-documents")
          .remove([uploadedFilePath]);
      }

      return NextResponse.json(
        {
          success: false,
          message:
            "داخلہ درخواست Database میں محفوظ نہیں ہوسکی۔",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `داخلہ درخواست کامیابی سے محفوظ ہوگئی۔ آپ کا داخلہ نمبر ${data.admission_number} ہے۔`,
        data,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Admission API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "سرور میں خرابی پیش آگئی۔ براہِ کرم دوبارہ کوشش کریں۔",
      },
      {
        status: 500,
      }
    );
  }
}