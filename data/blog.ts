import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "cli-productivity-hacks",
    title: "CLI Productivity Hacks Favorit Saya",
    date: "2024-11-10",
    excerpt:
      "Kumpulan alias, fungsi shell, dan tool kecil yang bikin kerja backend serasa seluncur di terminal.",
    tags: ["terminal", "productivity"],
    readingTime: "4 menit",
    imageUrls: [],
    content: [
      "Saya selalu merasa paling produktif saat semua pekerjaan dilakukan lewat terminal. Karena itu saya merapikan dotfiles dan bikin sekumpulan alias ringan .  contoh paling sering dipakai adalah `gst` untuk `git status`, `gco` untuk checkout branch, dan `lg` yang menampilkan log git dengan format graf berwarna. Semua alias saya taruh di file `~/.config/zsh/aliases.zsh` lalu saya source dari `.zshrc` supaya rapi.",
      "Fondasi environment saya adalah Oh My Zsh. Dengan framework ini saya bisa memakai theme `powerlevel10k` dan plugin favorit seperti `git`, `zsh-autosuggestions`, serta `zsh-syntax-highlighting`. Kombinasinya bikin prompt selalu menampilkan branch, status staging, dan waktu eksekusi command terakhir. Kalau lagi debugging lambat, cukup lihat prompt untuk tahu command mana yang boros waktu.",
      "Untuk navigasi direktori saya mengandalkan `zoxide`. Tool ini mirip autojump generasi baru yang menghitung frekuensi kunjungan. Saya bikin alias `zpr` untuk `z personal-web` sehingga pindah repo hanya satu huruf. Saat lupa nama direktori, tinggal ketik `zi` lalu pilih dari daftar interaktif `fzf`. Keduanya saya ikat lewat widget `fzf-zoxide` sehingga semua serba cepat.",
      "Produktivitas tambahan datang dari kombinasi `tmux` dan `wezterm`. Saya punya session bernama `dev` yang otomatis membuka panel kiri untuk editor (melalui `nvim`) dan panel kanan untuk server `npm run dev`. Setiap kali login server, cukup jalankan `tmux attach -t dev` dan semua lingkungan siap pakai. Workflow ini bikin saya jarang menyentuh GUI kecuali ketika harus cek desain atau preview animasi di browser."
    ],
  },
  {
    slug: "rag-chatbot-notes",
    title: "Retrieval Augmented Generation: Bangun Chatbot yang kaga halusinasi",
    date: "2024-10-28",
    excerpt:
      "Catatan ringan membangun chatbot internal pakai Retrieval Augmented Generation supaya jawaban selalu relevan.",
    tags: ["ai", "rag", "chatbot"],
    readingTime: "6 menit",
    imageUrls: [],
    content: [
      "Masalah utama chatbot internal adalah halu karena model cuma mengandalkan pengetahuan pra-latih. Saya coba pendekatan RAG (Retrieval Augmented Generation): dokumen teknis tim diubah jadi potongan embedding, lalu setiap pertanyaan user saya cari kandidat paragraf terbaik sebelum dilempar ke LLM.",
      "Stack-nya: ingestion dengan pipeline Node.js sederhana yang membaca dokumen markdown, melakukan chunking (maks 500 token) lalu simpan embedding ke Supabase Vector. Saat query datang, service Go memanggil Supabase untuk vektor terdekat, menyusun prompt dengan konteks, baru memanggil OpenAI API.",
      "Tantangan terbesar justru menjaga konten selalu up-to-date. Saya bikin webhook setiap commit ke repo docs otomatis men-trigger pipeline ingestion. Selain itu saya tambahkan guardrail di prompt: instruksi keras supaya bot jawab “nggak tahu” kalau konteks retrieval kosong. Hasilnya akurasi perceived user naik jauh dan feedback internal jadi positif."
    ],
  },
  {
    slug: "why-rust-overkill",
    title: "Kenapa Rust Itu Overkill?",
    date: "2024-11-15",
    excerpt:
      "Banyak yang bilang Rust adalah solusi untuk semua masalah. tapi apakah worth it belajar rust?",
    tags: ["rust", "dev", "opini"],
    readingTime: "5 menit",
    imageUrls: ["https://i.redd.it/5v9ygeh9r1c91.jpg"],
    content: [
      "Rust sering disebut sebagai bahasa pemrograman modern terbaik. Performance-nya mendekati C/C++, memory safety tanpa garbage collector, multi-threading aman, bahkan tooling seperti cargo juga mantap. Tapi, apakah Rust selalu jadi jawaban untuk tiap masalah pemrograman?",
      "Jujur, berdasarkan pengalaman pribadi, Rust sebenarnya sering terasa overkill. khususnya buat project backend atau tooling kecil yang *not mission critical*. Banyak fitur powerful Rust yang justru jadi penghalang produktivitas: compile time lama, learning curve curam, serta ownership dan lifetime yang awalnya membingungkan (dan pasti sering error \"borrow checker\"). Seringkali, develop feature sederhana bisa lebih cepat rampung pakai Go, Python, atau bahkan Node.js.",
      "Contoh, untuk bikin REST API atau CLI sederhana, Go bisa jadi binary kecil, cepat, dan mudah di-deploy. Python menang di ekosistem library, sedangkan Node.js unggul di prototyping. Semuanya punya trade-off, tapi learning cost-nya jauh di bawah Rust. Kecuali memang butuh control super tight atas performance dan safety, Rust lebih cocok untuk domain-domain seperti sistem low-level, embedded, atau software yang harus super reliable (misal: crypto wallet, database engine, dsb). Selain dari itu? Kadang-kadang, Anda hanya perlu tool yang \"cukup bagus\" dan gampang di-maintain tim.",
      "Kesimpulannya: Rust itu keren, tapi (seringkali) overkill untuk kebanyakan kasus sehari-hari. Pilih tool yang paling sesuai masalah dan tim Anda, bukan yang paling hype. Kalau Anda ingin tantangan atau project mission critical, silakan gunakan Rust. tapi jangan buang waktu tim untuk rewrite project kecil cuma karena pengen \"hipster\". #pragmatis"
    ],
  },
  {
    slug: "generative-ai-for-non-techies",
    title: "Generative AI: Inovasi Paling Keren bagi umat manusia",
    date: "2024-11-20",
    excerpt:
      "Pernah dengar soal ChatGPT, Midjourney, atau Dall-E? Yuk kenalan dengan generative AI. teknologi canggih yang bisa bantu bukan cuma orang IT!",
    tags: ["ai", "generative", "inspirasi"],
    readingTime: "6 menit",
    imageUrls: [
      "https://media.makeameme.org/created/generative-ai-its.jpg",
      "https://uploads.dailydot.com/2025/01/chatgpt_memes_twitter.jpg?auto=compress&fm=pjpg",
    ],
    content: [
      "Coba bayangin, ada teknologi yang bisa mikir kayak manusia, ngerti apa maksud kita, terus bisa bikin sesuatu sesuai permintaan kita. Itulah generative AI. Rasanya kayak punya temen super pinter yang nggak pernah lelah ngobrol bareng.",
      "Kamu mungkin udah sering lihat ada orang bikin gambar lucu dari kata-kata doang, atau punya asisten virtual yang bisa nulis email, bahkan merangkum dokumen otomatis. Nah, itu semua berkat Generative AI. Tapi sebenernya, generative AI itu apa sih? Kenapa yang nggak ngerti IT juga perlu tahu?",
      "Generative AI itu teknologi yang bisa bikin hal baru: bisa teks, gambar, suara, kode, apa aja. Prinsipnya belajar dari banyak data yang udah ada. Contohnya kayak ChatGPT buat chat, atau Midjourney bikin ilustrasi dari satu kalimat. AI kayak gini benar-benar bikin sesuatu yang sebelumnya belum pernah ada.",
      "Buat nyobain generative AI, tenang aja, nggak harus jago ngoding atau matematika tinggi. Banyak banget layanan kayak Canva AI, Google Gemini, ChatGPT, yang udah tinggal klik, nggak ribet. Tinggal ketik pertanyaan atau perintah, tunggu sebentar, hasilnya langsung keluar. Kurang lebih kayak nungguin gorengan mateng, tau-tau udah jadi.",
      "Manfaat generative AI buat yang nggak paham teknologi itu luas banget. Bisa bantu nulis email, artikel, bikin caption biar nggak kaku, atau bikin desain tanpa harus kenal Photoshop. Kalau lagi buntu bikin presentasi, generative AI juga bisa bantu nyusun outline. Hidup jadi terasa lebih mudah.",
      "Tapi, hasil AI kadang nggak selalu sempurna. Suka juga ada bagian yang ngawur, jadi tetep harus dicek sebelum dipakai. AI memang bisa ngebantu ngirit waktu dan jadi partner brainstorming, asal hasil akhirnya tetap kamu periksa. Jangan juga masukin info penting atau rahasia ke layanan AI gratisan ya.",
      "Saya sendiri juga pakai generative AI buat ngerjain skripsi. Kalau mau lihat hasilnya, silakan cek di sini: https://thesis.fzrsahi.com",
      "Intinya, generative AI itu kayak asisten kreatif yang siaga 24 jam. Siapa pun kamu, guru, mahasiswa, pekerja, atau content creator, AI bisa banget jadi alat bantu harian. Yuk, coba pakai tanpa ragu. Siapa tau, pulang-pulang udah dapat ide cemerlang atau kerjaan lebih cepat selesai."
    ],
  },
];

