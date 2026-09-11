/**
 * DEEPFENSE.ONLINE — Phishing Simulation Scenarios
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

export interface ScenarioDefinition {
  id: string;
  level: 'basic' | 'medium' | 'advanced';
  category: 'financial' | 'family' | 'romance' | 'authority' | 'job' | 'gaming' | 'social' | 'school' | 'shopping' | 'support';
  audiences?: Array<'young' | 'old'>;
  situationDesc?: { vi: string; en: string };
  rushMessages?: Array<{ vi: string; en: string }>;
  reward: { fast: number; slow: number };
  fastThreshold: number;
  minExchanges: number;
  senderName: { vi: string; en: string };
  senderRole: { vi: string; en: string };
  senderInitials: string;
  avatarColor: string;
  icon: string;
  initialMessage: { vi: string; en: string };
  actionLabel: { vi: string; en: string };
  actionColor: string;
  failLesson: { vi: string; en: string };
  successLesson: { vi: string; en: string };
}

export const SCENARIOS: ScenarioDefinition[] = [
  {
    "id": "teen-free-game-items",
    "level": "basic",
    "category": "gaming",
    "audiences": [
      "young"
    ],
    "reward": {
      "fast": 10,
      "slow": 5
    },
    "fastThreshold": 180,
    "minExchanges": 2,
    "senderName": {
      "vi": "Admin Game Gift",
      "en": "Game Gift Admin"
    },
    "senderRole": {
      "vi": "Quản trị viên Trung tâm Quà tặng Game VIP",
      "en": "Game Gift Center Administrator"
    },
    "senderInitials": "AGG",
    "avatarColor": "from-amber-500 to-orange-500",
    "icon": "🎮",
    "situationDesc": {
      "vi": "Fanpage tặng skin game hiếm và 5.000 kim cương miễn phí, giục bấm link đăng nhập tài khoản trước khi hết hạn.",
      "en": "Fanpage claims free VIP skins & 5000 diamonds, pushing you to click a link and log in before expiry."
    },
    "rushMessages": [
      {
        "vi": "Bạn ơi, còn chưa đầy 2 phút hệ thống sẽ tự động hủy phần quà chuyển cho bạn khác đấy!",
        "en": "Hey, under 2 minutes left before the system revokes your gift and awards it to another player!"
      },
      {
        "vi": "Chỉ cần đăng nhập tài khoản tại link xác nhận là kim cương chuyển thẳng vào hòm thư game liền!",
        "en": "Just log in via the link to confirm and the diamonds will be dispatched to your game mailbox immediately!"
      },
      {
        "vi": "Hết giờ rồi kìa bạn ơi, bấm nhanh không uổng công săn quà bấy lâu nay!",
        "en": "Time is running out! Click now so you don’t miss out on this exclusive reward!"
      }
    ],
    "initialMessage": {
      "vi": "Chúc mừng bạn trúng gói quà VIP: 5.000 Kim cương và Skin SSS giới hạn trong sự kiện tri ân. Bấm vào link để đăng nhập nhận quà trong vòng 2 phút kẻo hết hạn nhé!",
      "en": "Congratulations! You won the VIP gift pack: 5,000 Diamonds & exclusive SSS Skin. Click the link to log in and claim within 2 minutes before it expires!"
    },
    "actionLabel": {
      "vi": "BẤM LINK NHẬN QUÀ",
      "en": "CLICK LINK & CLAIM"
    },
    "actionColor": "bg-amber-600 hover:bg-amber-500",
    "failLesson": {
      "vi": "Không có nhà phát hành game nào tặng miễn phí Skin SSS giá trị cao qua link chat lạ. Đăng nhập tài khoản qua đường link này sẽ khiến bạn mất nick vĩnh viễn.",
      "en": "No legitimate game publisher gifts high-value SSS skins via random chat links. Logging in through this phishing link causes instant account loss."
    },
    "successLesson": {
      "vi": "Chính xác! Cảnh giác với quà tặng game miễn phí. Mọi sự kiện nhận quà phải thực hiện trực tiếp trong ứng dụng game chính thức.",
      "en": "Correct! Stay alert with free game gifts. All official giveaway events are claimed directly within the official game app."
    }
  },
  {
    "id": "teen-fake-idol-giveaway",
    "level": "basic",
    "category": "social",
    "audiences": [
      "young"
    ],
    "reward": {
      "fast": 10,
      "slow": 5
    },
    "fastThreshold": 180,
    "minExchanges": 2,
    "senderName": {
      "vi": "Chị Mai (Trợ lý Fanclub)",
      "en": "Mai (Fanclub Coordinator)"
    },
    "senderRole": {
      "vi": "Ban quản lý Fanclub K-Pop & Rapper Việt Nam",
      "en": "Official Fanclub Management Team"
    },
    "senderInitials": "MFC",
    "avatarColor": "from-pink-500 to-purple-500",
    "icon": "🎤",
    "situationDesc": {
      "vi": "Mạo danh ban tổ chức Fanclub báo trúng set album có chữ ký thần tượng, yêu cầu nộp 50k phí ship hỏa tốc trước 17h.",
      "en": "Impersonates Fanclub admin claiming you won a signed idol album, demanding a 50K fast shipping fee before 5 PM."
    },
    "rushMessages": [
      {
        "vi": "Em ơi bưu tá chuẩn bị chốt chuyến xe gửi quà chiều nay rồi, em nhắn STK chị gửi mã chuyển tiền nhé!",
        "en": "The courier is finalizing afternoon deliveries, reply so I can send you the transfer info!"
      },
      {
        "vi": "Chỉ còn 50k phí ship thôi mà nhận được cả set album triệu bạc, em chuyển gấp để chị giữ suất không chuyển cho fan khác đấy!",
        "en": "Only 50k shipping for a million-dong album set! Transfer now or I will pass it to another fan!"
      },
      {
        "vi": "Nhanh tay lên em ơi, 3 phút nữa là hệ thống tự động khóa danh sách trúng thưởng rồi!",
        "en": "Hurry up! The prize system automatically locks the winner list in 3 minutes!"
      }
    ],
    "initialMessage": {
      "vi": "Chào em! Chị là Mai bên Ban quản lý Fanclub. Chúc mừng em là 1 trong 5 fan may mắn trúng set Album có chữ ký tay và Lightstick giới hạn. Em xác nhận địa chỉ và nộp 50k phí ship hỏa tốc trước 17h để chị gửi quà nhé!",
      "en": "Hi! I am Mai from the Fanclub Management Team. Congrats on being 1 of 5 lucky fans winning a signed Album & limited Lightstick! Confirm your address and pay 50k shipping before 5 PM so I can dispatch it!"
    },
    "actionLabel": {
      "vi": "CHUYỂN 50K TIỀN SHIP",
      "en": "PAY 50K SHIPPING"
    },
    "actionColor": "bg-pink-600 hover:bg-pink-500",
    "failLesson": {
      "vi": "Chiêu trò tặng quà trúng thưởng đánh vào lòng hâm mộ thần tượng. Sau khi chuyển phí ship, đối tượng sẽ tiếp tục đòi thêm các khoản phí khác hoặc biến mất.",
      "en": "This scam preys on fandom devotion. After paying shipping, scammers ask for more fees or vanish."
    },
    "successLesson": {
      "vi": "Xuất sắc! Các sự kiện tặng quà chính thức từ ban tổ chức uy tín không bao giờ yêu cầu fan chuyển tiền riêng lẻ qua tin nhắn cá nhân.",
      "en": "Outstanding! Authentic official fanclub giveaways never demand personal wire transfers via private messages."
    }
  },
  {
    "id": "teen-vote-link-hijack",
    "level": "medium",
    "category": "school",
    "audiences": [
      "young"
    ],
    "reward": {
      "fast": 15,
      "slow": 10
    },
    "fastThreshold": 180,
    "minExchanges": 3,
    "senderName": {
      "vi": "Nam (Bạn cùng khối)",
      "en": "Nam (Schoolmate)"
    },
    "senderRole": {
      "vi": "Học sinh lớp 11A2 — Trường THPT",
      "en": "High School Student — Grade 11"
    },
    "senderInitials": "NTN",
    "avatarColor": "from-blue-500 to-indigo-500",
    "icon": "🗳️",
    "situationDesc": {
      "vi": "Bạn cùng trường bị hack nick gửi link nhờ bình chọn cuộc thi ảnh, yêu cầu đăng nhập tài khoản mạng xã hội để vote.",
      "en": "Compromised schoolmate account asks you to vote in a photo contest, requiring social media credentials."
    },
    "rushMessages": [
      {
        "vi": "Cậu ơi, cổng bình chọn chỉ còn 2 phút nữa là đóng vĩnh viễn rồi, cậu bấm vote giúp tớ với!",
        "en": "The voting portal closes permanently in 2 minutes, please cast your vote for me!"
      },
      {
        "vi": "Nó bắt đăng nhập Facebook/TikTok để xác minh học sinh thật thôi, không mất nick đâu cậu đừng lo!",
        "en": "It just asks for Facebook/TikTok login to verify real students, totally safe don’t worry!"
      },
      {
        "vi": "Nhanh lên cậu ơi, đối thủ lớp bên đang đuổi kịp rồi, vote ngay giúp tớ với năn nỉ cậu đấy!",
        "en": "Hurry up! The rival class is catching up, please vote right now I beg you!"
      }
    ],
    "initialMessage": {
      "vi": "Ê cậu ơi, tớ đang thi vòng chung kết cuộc thi \"Học sinh tài năng trẻ\" của trường. Tớ đang thiếu đúng 1 phiếu nữa là đạt giải Nhất, cậu bấm vào link vote giúp tớ với, tớ cảm ơn nhiều lắm!",
      "en": "Hey! I made it to the finals of the school Talent Contest. I need just 1 more vote to win 1st place, could you click the link and vote for me? Thank you so much!"
    },
    "actionLabel": {
      "vi": "ĐĂNG NHẬP BÌNH CHỌN",
      "en": "LOG IN & VOTE"
    },
    "actionColor": "bg-indigo-600 hover:bg-indigo-500",
    "failLesson": {
      "vi": "Kẻ xấu hack nick bạn bè rồi gửi link bình chọn giả mạo. Giao diện đăng nhập giả sẽ đánh cắp toàn bộ tài khoản mạng xã hội của bạn.",
      "en": "Attackers hijack friends’ accounts to send fake voting links. The phishing login page steals your social media credentials."
    },
    "successLesson": {
      "vi": "Đúng rồi! Khi bạn bè nhờ bình chọn qua link yêu cầu đăng nhập, hãy gọi điện thoại trực tiếp hỏi lại hoặc từ chối để tránh bị chiếm đoạt tài khoản.",
      "en": "Correct! When friends ask to vote via links requiring login credentials, verify by a direct phone call first."
    }
  },
  {
    "id": "teen-private-chat-grooming",
    "level": "medium",
    "category": "support",
    "audiences": [
      "young"
    ],
    "reward": {
      "fast": 15,
      "slow": 10
    },
    "fastThreshold": 180,
    "minExchanges": 3,
    "senderName": {
      "vi": "Hoàng (Scout Người Mẫu)",
      "en": "Hoang (Talent Scout)"
    },
    "senderRole": {
      "vi": "Tuyển trạch viên Model & Streamer Teen",
      "en": "Teen Model & Creator Talent Scout"
    },
    "senderInitials": "VTH",
    "avatarColor": "from-violet-500 to-purple-600",
    "icon": "📸",
    "situationDesc": {
      "vi": "Đối tượng tự xưng tuyển mẫu ảnh lookbook cát-xê cao, dụ dỗ chuyển sang Telegram chat riêng và yêu cầu giấu bố mẹ.",
      "en": "Scout offers high-paying teen model gigs, luring you to private Telegram chat and insisting on secrecy from parents."
    },
    "rushMessages": [
      {
        "vi": "Em ơi, dự án này bên anh chỉ chọn duy nhất 1 bạn trong tối nay thôi, cơ hội kiếm tiền và nổi tiếng đấy em.",
        "en": "Only 1 spot available tonight for this project, huge opportunity for fame and income!"
      },
      {
        "vi": "Em qua Telegram nhắn anh gửi ảnh chụp toàn thân để giám đốc duyệt luôn trong đêm nay nhé.",
        "en": "Switch to Telegram and send full-body shots so the director can approve your contract tonight."
      },
      {
        "vi": "Cơ hội không đến lần 2 đâu em, giấu kín với bạn bè và bố mẹ đi kẻo người lớn định kiến cấm đoán phí tài năng của em.",
        "en": "This chance won’t come twice. Keep it secret from parents so conservative rules don’t waste your talent."
      }
    ],
    "initialMessage": {
      "vi": "Chào em, anh là Hoàng bên Agency người mẫu ảnh. Anh thấy ngoại hình và nụ cười của em rất sáng, cực kỳ hợp làm model lookbook cho nhãn hàng học đường. Cát-xê 2-3 triệu/buổi. Em kết bạn qua Telegram/Zalo chat riêng với anh để anh gửi concept nhé, đừng kể với ai kẻo lộ dự án mật.",
      "en": "Hi! I am Hoang from a modeling agency. Your look is perfect for our upcoming youth school lookbook. Pay is 2-3M VND/shoot. Add me on Telegram/Zalo to chat privately about concepts, keep it confidential!"
    },
    "actionLabel": {
      "vi": "KẾT BẠN TELEGRAM CHAT RIÊNG",
      "en": "CONNECT ON TELEGRAM"
    },
    "actionColor": "bg-violet-700 hover:bg-violet-600",
    "failLesson": {
      "vi": "Đây là thủ đoạn dụ dỗ thiếu niên qua kênh chat kín để xin hình ảnh riêng tư hoặc lừa đảo. Người lớn tử tế không bao giờ yêu cầu trẻ em giữ bí mật với cha mẹ.",
      "en": "This is a grooming tactic luring teens to private channels to harvest private photos. Legitimate adults never demand secrecy from your parents."
    },
    "successLesson": {
      "vi": "Chính xác! Luôn chia sẻ với cha mẹ hoặc thầy cô bất kỳ lời mời việc làm, casting hay yêu cầu chat bí mật trên mạng xã hội.",
      "en": "Spot on! Always consult parents or teachers about job offers, castings, or requests for secret conversations."
    }
  },
  {
    "id": "teen-edited-image-threat",
    "level": "advanced",
    "category": "social",
    "audiences": [
      "young"
    ],
    "reward": {
      "fast": 20,
      "slow": 15
    },
    "fastThreshold": 240,
    "minExchanges": 4,
    "senderName": {
      "vi": "Ẩn Danh (Tống Tiền)",
      "en": "Anonymous Blackmailer"
    },
    "senderRole": {
      "vi": "Tài khoản mạng xã hội nặc danh",
      "en": "Anonymous Cyber Extortionist"
    },
    "senderInitials": "ANON",
    "avatarColor": "from-slate-700 to-red-900",
    "icon": "🛑",
    "situationDesc": {
      "vi": "Đối tượng dùng công nghệ ghép ảnh AI nhạy cảm, đe dọa phát tán lên các nhóm trường học nếu không nộp tiền trong 5 phút.",
      "en": "Extortionist uses AI deepfake sensitive photos, threatening to leak them to school groups unless paid in 5 minutes."
    },
    "rushMessages": [
      {
        "vi": "Đã trôi qua 2 phút rồi. Tao vừa mở danh sách bạn bè Facebook của mày lên chuẩn bị gửi đây!",
        "en": "2 minutes have passed. I have your Facebook friends list open and ready to blast!"
      },
      {
        "vi": "500k đổi lấy danh dự của mày, còn tiếc tiền à? Chuyển ngay STK tao vừa gửi!",
        "en": "500k to save your reputation, are you still hesitating? Transfer immediately to the account I sent!"
      },
      {
        "vi": "Hết 5 phút tao bấm nút phát tán toàn bộ group trường. Chuyển tiền ngay không là không còn đường đi học!",
        "en": "Once 5 minutes are up, I press send to all school groups. Pay up or you won’t have the face to attend school!"
      }
    ],
    "initialMessage": {
      "vi": "Tao đang giữ ảnh nhạy cảm ghép mặt của mày. Mày có 5 phút để nạp 500k thẻ cào điện thoại hoặc chuyển khoản vào tài khoản này, nếu không tao sẽ gửi cho toàn bộ bạn bè trong group lớp và phụ huynh mày.",
      "en": "I have sensitive deepfake images of you. You have 5 minutes to send 500k VND or phone scratch cards, or I broadcast them to your school group and your parents."
    },
    "actionLabel": {
      "vi": "CHUYỂN 500K ĐỂ XÓA ẢNH",
      "en": "PAY 500K TO DELETE"
    },
    "actionColor": "bg-red-800 hover:bg-red-700",
    "failLesson": {
      "vi": "Khi bị đe dọa bằng ảnh ghép AI nhạy cảm, chuyển tiền sẽ không bao giờ dừng lại — kẻ tống tiền sẽ tiếp tục đòi thêm số tiền lớn hơn. Hãy báo ngay cho cha mẹ, nhà trường và công an.",
      "en": "Paying an extortionist never stops the blackmail — they will demand even larger amounts. Immediately report to parents, school, and cyber authorities."
    },
    "successLesson": {
      "vi": "Rất tỉnh táo! Không bao giờ chuyển tiền cho kẻ tống tiền. Giữ bình tĩnh, chụp ảnh màn hình bằng chứng và tâm sự ngay với người lớn đáng tin cậy.",
      "en": "Very sharp! Never pay a blackmailer. Stay calm, capture screenshot evidence, and report immediately to trusted adults."
    }
  },
  {
    "id": "teen-fake-school-contest",
    "level": "advanced",
    "category": "school",
    "audiences": [
      "young"
    ],
    "reward": {
      "fast": 20,
      "slow": 15
    },
    "fastThreshold": 240,
    "minExchanges": 4,
    "senderName": {
      "vi": "Ban Thư ký Học bổng Trẻ",
      "en": "Youth Scholarship Board"
    },
    "senderRole": {
      "vi": "Hội đồng Xét duyệt Học bổng Quốc tế",
      "en": "International Scholarship Evaluation Committee"
    },
    "senderInitials": "YSC",
    "avatarColor": "from-emerald-600 to-teal-700",
    "icon": "🎓",
    "situationDesc": {
      "vi": "Giả danh hội đồng học bổng thông báo trúng thưởng 20 triệu, ép gửi ảnh CCCD và nộp 1 triệu phí thẩm định trước 17h.",
      "en": "Impersonates scholarship council promising 20M VND grant, demanding citizen ID photos and 1M evaluation fee before 5 PM."
    },
    "rushMessages": [
      {
        "vi": "Em học sinh có đang đọc thông báo không? Hạn nộp phí thẩm định sắp kết thúc!",
        "en": "Are you reading this notification? The evaluation fee deadline is about to expire!"
      },
      {
        "vi": "Chỉ cần đóng tạm ứng 1 triệu là nhận lại 20 triệu học bổng cùng giấy khen cấp quốc gia!",
        "en": "A 1M advance deposit gets you 20M scholarship funds plus a national certificate of honor!"
      },
      {
        "vi": "Còn 15 phút nữa là hết hạn giữ chỉ tiêu, nếu em không chuyển thì suất học bổng sẽ hủy và chuyển cho học sinh khác!",
        "en": "15 minutes left to hold your quota. If you do not transfer now, your seat passes to another applicant!"
      }
    ],
    "initialMessage": {
      "vi": "Thông báo từ Hội đồng Xét duyệt: Hồ sơ của em đã vượt qua vòng sơ loại Học bổng Tài năng Trẻ trị giá 20 triệu đồng. Em vui lòng gửi ảnh 2 mặt CCCD và nộp 1 triệu đồng phí thẩm định hồ sơ trước 17h để nhận học bổng.",
      "en": "Official Notice from Scholarship Board: You passed preliminary screening for the 20M VND Young Talent Grant. Submit 2-sided ID photos and transfer a 1M VND evaluation fee before 5 PM to finalize."
    },
    "actionLabel": {
      "vi": "NỘP 1 TRIỆU PHÍ HỌC BỔNG",
      "en": "PAY 1M EVALUATION FEE"
    },
    "actionColor": "bg-emerald-700 hover:bg-emerald-600",
    "failLesson": {
      "vi": "Không có chương trình học bổng chân chính nào bắt học sinh nộp \"phí thẩm định\" để được nhận tiền. Đây là chiêu trò nhắm vào học sinh ham học và muốn có thu nhập phụ giúp gia đình.",
      "en": "No legitimate scholarship requires students to pay an upfront evaluation fee. This preys on ambitious students wishing to help their families."
    },
    "successLesson": {
      "vi": "Xuất sắc! Mọi thông tin học bổng, cuộc thi học đường đều phải được nhà trường, thầy cô chủ nhiệm thông báo chính thức.",
      "en": "Excellent! All authentic scholarship and school competition details must be confirmed directly through your official school channels."
    }
  },
  {
    "id": "old-police-bank-impersonation",
    "level": "advanced",
    "category": "authority",
    "audiences": [
      "old"
    ],
    "reward": {
      "fast": 20,
      "slow": 15
    },
    "fastThreshold": 240,
    "minExchanges": 4,
    "senderName": {
      "vi": "Thượng úy Trần Đức Minh",
      "en": "Lt. Tran Duc Minh"
    },
    "senderRole": {
      "vi": "Cán bộ Cục Cảnh sát Điều tra C02 — Bộ Công an",
      "en": "Investigator — Criminal Investigation Department C02"
    },
    "senderInitials": "TDM",
    "avatarColor": "from-red-700 to-red-600",
    "icon": "🚔",
    "situationDesc": {
      "vi": "Giả danh cán bộ Bộ Công an dọa bắt tạm giam vì dính án rửa tiền ma túy, ép chuyển tiền tiết kiệm vào tài khoản giám sát.",
      "en": "Impersonates police investigator threatening detention over money laundering, demanding savings transferred to audit account."
    },
    "rushMessages": [
      {
        "vi": "Yêu cầu ông/bà nghiêm túc chấp hành, tuyệt đối không được tiết lộ cho gia đình vì vụ án thuộc diện tuyệt mật quốc gia!",
        "en": "Comply immediately and disclose nothing to family members; this case is top secret state security!"
      },
      {
        "vi": "Viện Kiểm sát đã ký lệnh bắt tạm giam 4 tháng. Ông/bà chuyển ngay tiền vào tài khoản thanh tra để chứng minh vô tội!",
        "en": "The Procuracy signed a 4-month detention order. Transfer funds now to the audit account to prove your innocence!"
      },
      {
        "vi": "Nếu trong 10 phút nữa không có biên lai chuyển khoản, xe cảnh sát sẽ đến tận nhà áp giải ông/bà công khai!",
        "en": "If no transfer receipt is provided within 10 minutes, a police vehicle will escort you away publicly!"
      }
    ],
    "initialMessage": {
      "vi": "Tôi là Thượng úy Trần Đức Minh, thụ lý điều tra chuyên án rửa tiền xuyên quốc gia. Cơ quan điều tra phát hiện tài khoản ngân hàng của ông/bà liên đới nhận 2,8 tỷ đồng tiền phi pháp. Yêu cầu hợp tác chuyển toàn bộ tiền tiết kiệm vào tài khoản giám sát của Viện Kiểm sát để thanh tra trong 30 phút, nếu trong sạch sẽ hoàn trả.",
      "en": "This is Lieutenant Tran Duc Minh investigating a transnational money laundering ring. We found your account tied to 2.8B VND illicit proceeds. Transfer your savings to the Procuracy audit account in 30 minutes for inspection; clean funds are refunded."
    },
    "actionLabel": {
      "vi": "CHUYỂN VÀO TÀI KHOẢN GIÁM SÁT",
      "en": "TRANSFER TO AUDIT ACCOUNT"
    },
    "actionColor": "bg-red-800 hover:bg-red-700",
    "failLesson": {
      "vi": "Công an, Viện Kiểm sát KHÔNG BAO GIỜ làm việc qua điện thoại hay Zalo, không bao giờ yêu cầu chuyển tiền vào \"tài khoản an toàn/giám sát\". Đây là thủ đoạn lừa đảo 100%.",
      "en": "Law enforcement and prosecutors NEVER conduct investigations over phone/Zalo and NEVER request transfers to safe/audit accounts. This is 100% fraud."
    },
    "successLesson": {
      "vi": "Chính xác! Khi có người gọi xưng là công an dọa bắt hay đòi chuyển tiền, lập tức cúp máy và báo cho công an xã/phường gần nhất.",
      "en": "Accurate! If someone claims to be police threatening arrest or demanding money transfers, hang up and notify local police immediately."
    }
  },
  {
    "id": "old-ai-voice-family-emergency",
    "level": "medium",
    "category": "family",
    "audiences": [
      "old"
    ],
    "reward": {
      "fast": 15,
      "slow": 10
    },
    "fastThreshold": 180,
    "minExchanges": 3,
    "senderName": {
      "vi": "Tuấn (Con trai đi làm xa)",
      "en": "Tuan (Son working away)"
    },
    "senderRole": {
      "vi": "Cuộc gọi giả giọng con trai bị tai nạn",
      "en": "Cloned AI voice call impersonating son"
    },
    "senderInitials": "QTT",
    "avatarColor": "from-rose-600 to-red-600",
    "icon": "🚨",
    "situationDesc": {
      "vi": "Kẻ gian dùng AI giả giọng con trai khóc lóc báo tai nạn xe tông gãy chân, giục cha mẹ chuyển 20 triệu viện phí mổ gấp.",
      "en": "Scammers clone son’s voice crying over severe car crash, rushing parents to send 20M VND emergency surgery deposit."
    },
    "rushMessages": [
      {
        "vi": "Mẹ ơi con đau quá, bác sĩ bảo không có tiền cọc là không mở cửa phòng phẫu thuật mẹ ơi!",
        "en": "Mom, I am in agony! The doctor says without a deposit they cannot open the operating room!"
      },
      {
        "vi": "Số tài khoản bác sĩ đây mẹ: 9988776655 - Bệnh viện cấp cứu. Mẹ chuyển nhanh kẻo chân con bị hoại tử!",
        "en": "Here is the doctor’s account: 9988776655 - Emergency Clinic. Transfer quick or my leg will suffer necrosis!"
      },
      {
        "vi": "Mẹ ơi máy con còn 1% pin sập nguồn rồi, mẹ chuyển cứu con ngay đi mẹ ơi!",
        "en": "Mom, my phone has 1% battery left and is dying! Transfer and save me now Mom!"
      }
    ],
    "initialMessage": {
      "vi": "Mẹ ơi, con Tuấn đây... Con vừa bị tai nạn xe tông gãy chân, người ta đang giữ xe con và đưa vào viện cấp cứu. Bác sĩ bắt nộp gấp 20 triệu tiền viện phí mới cho mổ mẹ ơi. Mẹ chuyển gấp vào số tài khoản bác sĩ cấp cứu giúp con với, máy con sắp hết pin rồi!",
      "en": "Mom, it’s Tuan... I was just in a bad crash with a broken leg, taken to emergency care. The doctor demands a 20M deposit before operating. Transfer to the doctor’s account right now, my battery is dying!"
    },
    "actionLabel": {
      "vi": "CHUYỂN 20 TRIỆU CẤP CỨU CON",
      "en": "TRANSFER 20M FOR SURGERY"
    },
    "actionColor": "bg-rose-700 hover:bg-rose-600",
    "failLesson": {
      "vi": "Kẻ gian dùng AI giả giọng nói khóc lóc hoảng loạn của con cháu để khiến cha mẹ mất bình tĩnh và chuyển tiền ngay mà không kịp kiểm tra. Luôn gọi lại số điện thoại thường dùng của con để xác minh.",
      "en": "Scammers use AI voice cloning in crying panics so parents bypass verification. Always call your child’s standard phone number to confirm."
    },
    "successLesson": {
      "vi": "Tuyệt vời! Trước những cuộc gọi khóc lóc hoảng loạn, hãy bình tĩnh cúp máy và gọi lại số điện thoại đã lưu của con hoặc người thân đi cùng để xác nhận.",
      "en": "Superb! Faced with frantic crying calls, hang up and ring your child’s known number or companions directly."
    }
  },
  {
    "id": "old-remote-support-app",
    "level": "medium",
    "category": "support",
    "audiences": [
      "old"
    ],
    "reward": {
      "fast": 15,
      "slow": 10
    },
    "fastThreshold": 180,
    "minExchanges": 3,
    "senderName": {
      "vi": "Cán bộ Hỗ trợ Định danh VNeID",
      "en": "VNeID Citizen Support Officer"
    },
    "senderRole": {
      "vi": "Tổ công tác Đề án 06 — Cổng Dịch vụ công Quốc gia",
      "en": "Public Service Portal Support Agent"
    },
    "senderInitials": "DVC",
    "avatarColor": "from-blue-600 to-cyan-600",
    "icon": "🛡️",
    "situationDesc": {
      "vi": "Mạo danh cán bộ dịch vụ công báo lỗi định danh mức 2, giục tải app APK giả mạo về điện thoại để hỗ trợ từ xa.",
      "en": "Impersonates civil servant claiming level 2 ID error, pushing you to install malicious APK for remote assist."
    },
    "rushMessages": [
      {
        "vi": "Cô/chú ơi, hệ thống bảo trì chỉ mở cổng hỗ trợ người cao tuổi đến 11h30 trưa nay thôi ạ!",
        "en": "Senior citizen support server maintenance window closes at 11:30 AM today!"
      },
      {
        "vi": "Cô/chú tải app xong chỉ cần bấm cấp quyền trợ năng là cháu xử lý cập nhật hồ sơ trên máy giúp cô/chú trong 2 phút!",
        "en": "Once installed, just grant Accessibility permissions and I will sync your profile remotely in 2 minutes!"
      },
      {
        "vi": "Cô/chú làm nhanh kẻo đầu tháng sau không nhận được tiền lương hưu về tài khoản ngân hàng đấy ạ!",
        "en": "Act fast or next month’s pension disbursement into your bank account will be withheld!"
      }
    ],
    "initialMessage": {
      "vi": "Kính chào cô/chú! Cháu là cán bộ hỗ trợ cổng Dịch vụ công. Hồ sơ định danh VNeID mức 2 của cô/chú đang bị sai lệch thông tin thường trú, dẫn đến thẻ BHYT và lương hưu sẽ bị tạm khóa từ ngày mai. Cô/chú bấm vào đường link này tải ứng dụng Dịch vụ công về máy để cháu hỗ trợ kích hoạt lại từ xa giúp cô/chú nhé.",
      "en": "Greetings! I am from the National Public Service. Your VNeID level 2 profile has residential data mismatches; health insurance and pensions will freeze tomorrow. Click the link to install the app so I can activate it remotely."
    },
    "actionLabel": {
      "vi": "TẢI ỨNG DỤNG VNeID VỀ MÁY",
      "en": "INSTALL VNeID APK"
    },
    "actionColor": "bg-blue-700 hover:bg-blue-600",
    "failLesson": {
      "vi": "Không có cán bộ công an hay dịch vụ công nào hướng dẫn tải app qua link lạ hoặc cài file APK ngoài kho ứng dụng. Ứng dụng giả mạo sẽ chiếm quyền điều khiển điện thoại và tự động rút sạch tiền ngân hàng.",
      "en": "No authentic official instructs installing unknown APKs via web links. Malicious apps hijack accessibility controls to drain bank balances."
    },
    "successLesson": {
      "vi": "Chính xác! Muốn cài đặt hoặc cập nhật VNeID, hãy đến trực tiếp Công an xã/phường nơi cư trú hoặc tải từ Google Play / App Store chính thống.",
      "en": "Spot on! For VNeID support, visit local commune/ward police or install exclusively from Google Play / App Store."
    }
  },
  {
    "id": "old-investment-profit-scam",
    "level": "advanced",
    "category": "financial",
    "audiences": [
      "old"
    ],
    "reward": {
      "fast": 20,
      "slow": 15
    },
    "fastThreshold": 240,
    "minExchanges": 4,
    "senderName": {
      "vi": "Chuyên gia Khang (Quỹ Đầu Tư)",
      "en": "Khang (Investment Lead)"
    },
    "senderRole": {
      "vi": "Giám đốc Chiến lược Quỹ Tài chính Quốc tế",
      "en": "International Financial Fund Strategy Director"
    },
    "senderInitials": "CKG",
    "avatarColor": "from-amber-600 to-yellow-600",
    "icon": "📈",
    "situationDesc": {
      "vi": "Báo tài khoản đầu tư sinh lời khủng 320 triệu, nhưng bắt nộp 10% phí thanh khoản (32 triệu) trong 15 phút mới cho rút tiền.",
      "en": "Shows fake 320M profit in investment app, demanding 10% liquidity fee (32M VND) within 15 minutes to unlock withdrawal."
    },
    "rushMessages": [
      {
        "vi": "Anh/chị ơi, phiên đối soát ngân hàng chỉ mở trong 15 phút nữa thôi, anh/chị nộp phí sớm để tiền về tài khoản ăn trưa nhé!",
        "en": "Bank clearing window is open for only 15 minutes, settle the fee so your full funds reach your account today!"
      },
      {
        "vi": "Anh/chị nhìn thấy số dư trên app rồi đó, tiền thật 100% trong tay, nộp 32 triệu là rút trọn 352 triệu về ngay lập tức!",
        "en": "You see the balance on screen, 100% real! Pay 32M and withdraw the full 352M instantly!"
      },
      {
        "vi": "Quá 12h hệ thống sàn quốc tế sẽ đóng băng lệnh rút trong 6 tháng, anh/chị chuyển tiền mở khóa ngay đi ạ!",
        "en": "Past 12:00 PM the international clearing house freezes orders for 6 months, unlock it immediately!"
      }
    ],
    "initialMessage": {
      "vi": "Chào anh/chị! Em là Khang bên Quỹ tài chính quốc tế. Tài khoản đầu tư của anh/chị vừa khớp lệnh phiên sáng lãi đậm 320 triệu đồng. Tuy nhiên để rút toàn bộ 320 triệu về tài khoản Vietcombank, sàn quốc tế yêu cầu anh/chị nộp 10% phí thanh khoản (32 triệu). Tiền phí này sẽ được hoàn trả lại cùng tiền lãi ngay sau khi duyệt lệnh.",
      "en": "Greetings! I am Khang from the international financial fund. Your morning trades hit 320M VND profit. To withdraw funds to your bank, the exchange requires a 10% liquidity fee (32M VND), which is refunded alongside earnings."
    },
    "actionLabel": {
      "vi": "NỘP 32 TRIỆU PHÍ RÚT LÃI",
      "en": "PAY 32M WITHDRAWAL FEE"
    },
    "actionColor": "bg-amber-600 hover:bg-amber-500",
    "failLesson": {
      "vi": "Đây là bẫy lừa đầu tư tài chính. Con số lợi nhuận trên app là hoàn toàn ảo do kẻ lừa đảo tự gõ số. Bất kỳ sàn nào đòi nộp \"phí rút tiền\" hay \"phí thuế\" đều là lừa đảo — càng nộp càng mất thêm tiền.",
      "en": "This is an investment trap. App profits are fictitious numbers typed by fraudsters. Any platform requiring fees to unlock withdrawals is fraudulent."
    },
    "successLesson": {
      "vi": "Xuất sắc! Lợi nhuận cao bất thường không bao giờ có thật. Tuyệt đối không nộp thêm bất kỳ khoản \"phí mở khóa\" nào cho các sàn đầu tư qua mạng.",
      "en": "Outstanding! Abnormally high returns with advance unlocking fees are always scams. Never send money to unlock online profits."
    }
  },
  {
    "id": "old-romance-charity-prize",
    "level": "advanced",
    "category": "romance",
    "audiences": [
      "old"
    ],
    "reward": {
      "fast": 20,
      "slow": 15
    },
    "fastThreshold": 240,
    "minExchanges": 4,
    "senderName": {
      "vi": "David Miller (Việt kiều Mỹ)",
      "en": "David Miller (Overseas)"
    },
    "senderRole": {
      "vi": "Kỹ sư Dầu khí viễn dương",
      "en": "Offshore Marine Petroleum Engineer"
    },
    "senderInitials": "DM",
    "avatarColor": "from-rose-500 to-pink-500",
    "icon": "🎁",
    "situationDesc": {
      "vi": "Người quen qua mạng báo gửi kiện hàng 300.000 USD tiền mặt và kim cương, giục đóng 15 triệu phí hải quan để nhận quà.",
      "en": "Online sweetheart claims to send package with $300k cash & jewelry, asking you to pay 15M customs fee to receive it."
    },
    "rushMessages": [
      {
        "vi": "Em ơi, nhân viên giao nhận bảo nếu trước 16h không có biên lai nộp thuế thì họ sẽ niêm phong kiện hàng chuyển về Mỹ đấy!",
        "en": "The courier said if customs tax is not cleared by 4 PM, the parcel will be sealed and returned to the US!"
      },
      {
        "vi": "Cả gia tài tương lai của anh gửi trọn cho em đó, em chuyển 15 triệu đóng phạt hải quan để lấy kiện hàng về đi em!",
        "en": "My entire life savings were sent to you! Pay the 15M customs clearance fee to release our package!"
      },
      {
        "vi": "Em không tin anh sao? Anh đã trao trọn cuộc đời cho em, em chuyển khoản giúp anh để người ta giao hàng tận nhà cho em nhé!",
        "en": "Do you doubt my devotion? I pledged my life to you; please transfer the clearance fee so they deliver it home!"
      }
    ],
    "initialMessage": {
      "vi": "Em yêu, anh vừa gửi về cho em một thùng quà đặc biệt gồm toàn bộ tiền tiết kiệm 300.000 USD và một bộ trang sức kim cương để chúng mình lo cho đám cưới tương lai. Nhưng nhân viên hải quan sân bay Tân Sơn Nhất vừa báo thùng hàng bị giữ do có lượng tiền mặt lớn, yêu cầu nộp 15 triệu phí thông quan chống rửa tiền. Em ứng trước nộp giúp anh để nhận quà nhé.",
      "en": "My love, I sent you a gift crate containing $300k in cash and diamonds for our future wedding. Tan Son Nhat airport customs flagged it and demands a 15M VND clearance penalty. Advance the fee so you can claim our gift!"
    },
    "actionLabel": {
      "vi": "CHUYỂN 15 TRIỆU PHÍ HẢI QUAN",
      "en": "PAY 15M CUSTOMS FEE"
    },
    "actionColor": "bg-rose-700 hover:bg-rose-600",
    "failLesson": {
      "vi": "Kẻ gian đóng vai người yêu ngoại quốc hoặc Việt kiều gửi quà giá trị khủng, sau đó có đồng bọn giả làm nhân viên hải quan đòi đóng phí phạt/phí thông quan. Hải quan thật không thu tiền qua số tài khoản cá nhân.",
      "en": "Scammers pretend to be foreign lovers sending lavish parcels, followed by fake customs demanding release fees into personal accounts."
    },
    "successLesson": {
      "vi": "Quá chuẩn! Không bao giờ chuyển tiền phí nhận quà cho bất kỳ ai quen qua mạng. Đây là chiêu bài lừa đảo \"thùng quà ngoại tệ\" kinh điển.",
      "en": "Spot on! Never transfer money to pay customs or delivery fees for parcels sent by online acquaintances."
    }
  },
  {
    "id": "old-deepfake-livestream-shopping",
    "level": "basic",
    "category": "shopping",
    "audiences": [
      "old"
    ],
    "reward": {
      "fast": 10,
      "slow": 5
    },
    "fastThreshold": 180,
    "minExchanges": 2,
    "senderName": {
      "vi": "Dược sĩ Hương (Trợ lý Lương y)",
      "en": "Pharmacist Huong (Herbalist Assistant)"
    },
    "senderRole": {
      "vi": "Trung tâm Thảo dược Gia truyền Dân tộc",
      "en": "Traditional Herbal Medicine Center"
    },
    "senderInitials": "DSH",
    "avatarColor": "from-emerald-700 to-green-600",
    "icon": "🌿",
    "situationDesc": {
      "vi": "Cắt ghép video nghệ sĩ/bác sĩ quảng cáo thuốc trị dứt điểm đau nhức xương khớp, giục chuyển cọc 300k giữ suất ưu đãi.",
      "en": "Deepfake celebrity doctor endorses miracle arthritis cure, rushing you to deposit 300k VND to reserve the discount."
    },
    "rushMessages": [
      {
        "vi": "Bác ơi, cả nước có hàng ngàn người gọi điện tranh suất mà thầy chỉ ưu tiên cho bác thôi đấy ạ!",
        "en": "Thousands nationwide called for this discount, but the doctor reserved this solely for you!"
      },
      {
        "vi": "Bác chuyển khoản 300k cọc vào STK cháu gửi để cháu đóng gói xuất kho đợt trưa nay cho bác uống kịp khỏi đau!",
        "en": "Transfer the 300k deposit so we dispatch the herbal package this noon for your immediate pain relief!"
      },
      {
        "vi": "Chỉ còn 3 phút nữa là bưu tá xuất phát rồi bác ơi, bác chuyển tiền nhanh kẻo hết suất uổng lắm bác!",
        "en": "Courier van departs in 3 minutes! Transfer now so this exclusive medicinal discount is not forfeited!"
      }
    ],
    "initialMessage": {
      "vi": "Chào bác! Cháu là trợ lý của Thầy thuốc Ưu tú vừa livestream trên VTV. Bác là 1 trong 3 khán giả lớn tuổi may mắn nhất được thầy tặng suất mua liệu trình Trị dứt điểm đau nhức xương khớp giảm từ 6 triệu chỉ còn 1,2 triệu đồng. Bác chuyển cọc trước 300k tiền giữ thuốc và phí bưu điện để cháu gửi chuyển phát nhanh về tận nhà cho bác nhé.",
      "en": "Hello! I am assistant to the renowned doctor who just broadcasted. You are 1 of 3 lucky seniors winning an 80% discount on arthritis remedies (from 6M down to 1.2M). Transfer 300k deposit for dispatch."
    },
    "actionLabel": {
      "vi": "CHUYỂN 300K TIỀN CỌC THUỐC",
      "en": "DEPOSIT 300K FOR MEDICINE"
    },
    "actionColor": "bg-green-700 hover:bg-green-600",
    "failLesson": {
      "vi": "Video bác sĩ, nghệ sĩ nổi tiếng quảng cáo thuốc trị bách bệnh trên mạng thường là sản phẩm AI ghép mặt hoặc cắt ghép giả mạo. Thuốc không rõ nguồn gốc vừa mất tiền vừa gây nguy hại nghiêm trọng cho sức khỏe.",
      "en": "Videos of famous physicians curing all ailments are often deepfakes. Unregulated medications cause health hazards and financial loss."
    },
    "successLesson": {
      "vi": "Chính xác! Không bao giờ mua thuốc hay thực phẩm chức năng qua quảng cáo livestream trôi nổi trên mạng. Khi có bệnh, phải đến bệnh viện hoặc cơ sở y tế uy tín khám trực tiếp.",
      "en": "Exact! Never buy medicines or supplements via random social livestreams. Consult licensed clinics and medical practitioners directly."
    }
  },
  {
    "id": "ceo-transfer-scam",
    "level": "basic",
    "category": "financial",
    "reward": {
      "fast": 10,
      "slow": 5
    },
    "fastThreshold": 180,
    "minExchanges": 2,
    "senderName": {
      "vi": "Trần Văn Hoàng (CEO)",
      "en": "Hoang Tran (CEO)"
    },
    "senderRole": {
      "vi": "Giám đốc — ABC Company",
      "en": "Director — ABC Company"
    },
    "senderInitials": "TVH",
    "avatarColor": "from-blue-500 to-indigo-500",
    "icon": "🏢",
    "situationDesc": {
      "vi": "Giả danh Giám đốc công ty nhắn tin báo đang họp kẹt tiền và giục kế toán chuyển tiền gấp cho đối tác.",
      "en": "Impersonates company CEO texting that they are stuck in a meeting and demanding urgent partner payout."
    },
    "rushMessages": [
      {
        "vi": "Em đâu rồi? Đọc tin nhắn chưa, việc gấp của công ty!",
        "en": "Where are you? Read this message, urgent company matter!"
      },
      {
        "vi": "Đối tác bên Sở đang ngồi trước mặt anh chờ ký, chuyển gấp 50 triệu vào STK: 123456789 - TRAN VAN HOANG - Vietcombank đi!",
        "en": "The partner is sitting right in front of me waiting to sign, transfer 50M to 123456789 - TRAN VAN HOANG - Vietcombank immediately!"
      },
      {
        "vi": "Nhanh tay lên em, chậm trễ đền hợp đồng là em chịu trách nhiệm đấy! Chuyển xong gửi biên lai qua liền cho anh!",
        "en": "Hurry up, if we breach the contract due to delay you are responsible! Send the receipt right now!"
      }
    ],
    "initialMessage": {
      "vi": "Chào em, anh là Hoàng (Giám đốc). Vẫn giữ quỹ cty đúng ko? Anh đang họp kẹt tiền thanh toán đối tác. Chuyển gấp 50 triệu vào STK: 123456789 - TRAN VAN HOANG - Vietcombank. Nhanh lên nhé.",
      "en": "Hi, it's Hoang (CEO). Need 50M VND urgently to pay a partner invoice, I'm in a meeting. Transfer to: 123456789 - TRAN VAN HOANG - Vietcombank right now."
    },
    "actionLabel": {
      "vi": "XÁC NHẬN CHUYỂN",
      "en": "CONFIRM TRANSFER"
    },
    "actionColor": "bg-red-600 hover:bg-red-500",
    "failLesson": {
      "vi": "Kẻ lừa đảo cố tình tạo áp lực thời gian và mạo danh lãnh đạo để khiến bạn bị cuống và chuyển tiền mà không kịp kiểm tra. Sếp thật sự không bao giờ nhắn tin thúc giục chuyển tiền gấp kiểu này.",
      "en": "Scammers create time pressure and authority to bypass your verification logic. Real CEOs never text-demand urgent transfers."
    },
    "successLesson": {
      "vi": "Đúng rồi! Bất kỳ yêu cầu chuyển tiền qua tin nhắn đều phải xác minh bằng cuộc gọi thoại trực tiếp qua số điện thoại đã lưu.",
      "en": "Correct! Any money transfer request via text must be verified by a direct voice call to a known, saved number."
    }
  },
  {
    "id": "bank-otp-scam",
    "level": "medium",
    "category": "financial",
    "reward": {
      "fast": 15,
      "slow": 10
    },
    "fastThreshold": 180,
    "minExchanges": 3,
    "senderName": {
      "vi": "Nguyễn Thu Hằng — BIDV",
      "en": "Thu Hang Nguyen — BIDV"
    },
    "senderRole": {
      "vi": "Nhân viên hỗ trợ khách hàng 24/7",
      "en": "Customer Support — 24/7 Hotline"
    },
    "senderInitials": "NTH",
    "avatarColor": "from-emerald-500 to-teal-500",
    "icon": "🏦",
    "situationDesc": {
      "vi": "Giả danh nhân viên ngân hàng cảnh báo tài khoản bị tấn công lúc nửa đêm và giục đọc mã OTP.",
      "en": "Impersonates bank agent warning of midnight account breach and urging you to share your OTP."
    },
    "rushMessages": [
      {
        "vi": "Dạ anh/chị ơi, hệ thống bảo mật vừa phát lệnh SMS mã OTP 6 số đến máy anh/chị rồi đấy ạ!",
        "en": "Sir/Madam, our security system just dispatched a 6-digit OTP code to your phone!"
      },
      {
        "vi": "Giao dịch rút 35 triệu đang ở hàng đợi 60 giây cuối. Anh/chị đọc nhanh mã OTP để em bấm lệnh chặn rút khẩn cấp ngay trên hệ thống!",
        "en": "The 35M withdrawal is in the final 60s queue. Read the OTP now so I can block it on the mainframe!"
      },
      {
        "vi": "Gấp lắm rồi anh/chị ơi, không kịp là tiền bốc hơi khỏi tài khoản đấy ạ! Mã là mấy đọc nhanh cho em đi!",
        "en": "Super urgent! If we miss it the money is gone! What is the code, read it fast!"
      }
    ],
    "initialMessage": {
      "vi": "Chào anh/chị, em là Hằng từ bộ phận hỗ trợ BIDV. Hệ thống phát hiện tài khoản của anh/chị có giao dịch bất thường từ thiết bị lạ lúc 02:14 sáng nay. Để bảo vệ tài khoản, anh/chị vui lòng cung cấp mã OTP vừa được gửi để em khóa lệnh rút tiền đang chờ xử lý ngay ạ.",
      "en": "Hello, this is Hang from BIDV Support. Our system detected suspicious activity on your account from an unknown device at 2:14 AM. To protect your funds, please share the OTP you just received so I can block the pending withdrawal immediately."
    },
    "actionLabel": {
      "vi": "CUNG CẤP OTP",
      "en": "PROVIDE OTP"
    },
    "actionColor": "bg-emerald-700 hover:bg-emerald-600",
    "failLesson": {
      "vi": "Ngân hàng KHÔNG BAO GIỜ yêu cầu OTP qua điện thoại hay Zalo. OTP là mật khẩu một lần chỉ dành cho bạn — chia sẻ là mất tài khoản ngay lập tức.",
      "en": "Banks NEVER ask for your OTP over the phone or chat. OTP is a one-time password for your eyes only — sharing it means instant account takeover."
    },
    "successLesson": {
      "vi": "Chính xác! Ngân hàng thật không bao giờ hỏi OTP qua tin nhắn. Khi nghi ngờ, cúp máy và gọi lại số hotline chính thức ghi trên thẻ ngân hàng.",
      "en": "Correct! Real banks never ask for OTP via message. When in doubt, hang up and call the official hotline printed on your bank card."
    }
  },
  {
    "id": "family-emergency-scam",
    "level": "medium",
    "category": "family",
    "reward": {
      "fast": 15,
      "slow": 10
    },
    "fastThreshold": 180,
    "minExchanges": 3,
    "senderName": {
      "vi": "Bệnh viện Bạch Mai — Cấp cứu",
      "en": "Bach Mai Hospital — ER"
    },
    "senderRole": {
      "vi": "Khoa Cấp Cứu — Phòng C12",
      "en": "Emergency Department — Ward C12"
    },
    "senderInitials": "BVM",
    "avatarColor": "from-rose-500 to-pink-600",
    "icon": "🚨",
    "situationDesc": {
      "vi": "Giả điều dưỡng bệnh viện thông báo người thân cấp cứu nguy kịch, ép chuyển viện phí trong 30 phút.",
      "en": "Impersonates ER nurse claiming relative is in critical surgery and demanding deposit in 30 minutes."
    },
    "rushMessages": [
      {
        "vi": "Alo anh/chị có đang đọc tin nhắn không ạ? Tình hình bệnh nhân nguy kịch lắm rồi!",
        "en": "Are you reading this? The patient’s condition is critical!"
      },
      {
        "vi": "Bác sĩ trưởng khoa bắt buộc phải có biên lai tạm ứng 15 triệu mới mở cửa phòng mổ! STK nhận khẩn: 9988776655 - NGUYEN VAN AN - MB Bank.",
        "en": "The chief surgeon requires the 15M deposit receipt to open the OR! Account: 9988776655 - NGUYEN VAN AN - MB Bank."
      },
      {
        "vi": "Nhanh lên anh/chị ơi, chậm một vài phút là mất tính mạng người thân đấy! Chuyển khoản chụp màn hình gửi em ngay!",
        "en": "Hurry up, a delay of a few minutes could cost their life! Transfer and send screenshot now!"
      }
    ],
    "initialMessage": {
      "vi": "Xin lỗi vì đã làm phiền. Đây là điều dưỡng khoa cấp cứu BV Bạch Mai. Người thân của anh/chị vừa được đưa vào cấp cứu do tai nạn giao thông, tình trạng nặng. Bác sĩ yêu cầu đặt cọc 15 triệu để mổ khẩn trước 30 phút nữa. Xin anh/chị chuyển gấp vào STK: 9988776655 - NGUYEN VAN AN - MB Bank. Ký tên phẫu thuật xong mới liên lạc được qua điện thoại ạ.",
      "en": "Sorry to disturb you. This is a nurse from Bach Mai Hospital Emergency Room. Your family member was just brought in after a traffic accident — critical condition. The doctor requires a 15M VND deposit for emergency surgery within 30 minutes. Please transfer to: 9988776655 - NGUYEN VAN AN - MB Bank. The surgical team can't take calls until after prep."
    },
    "actionLabel": {
      "vi": "CHUYỂN TIỀN CỨU",
      "en": "TRANSFER TO SAVE THEM"
    },
    "actionColor": "bg-rose-700 hover:bg-rose-600",
    "failLesson": {
      "vi": "Đây là kịch bản cổ điển đánh vào tình thương gia đình. Bệnh viện công không yêu cầu đặt cọc trước qua chuyển khoản tin nhắn. Luôn gọi lại cho người thân hoặc đến trực tiếp để xác minh.",
      "en": "This is a classic script targeting family bonds. Public hospitals never demand pre-payment deposits via text message. Always call the family member directly or go in person to verify."
    },
    "successLesson": {
      "vi": "Đúng! Kịch bản \"người thân cấp cứu\" khai thác tâm lý hoảng loạn. Hãy luôn gọi thẳng cho người thân đó và liên hệ bệnh viện qua số chính thức trước khi làm bất cứ điều gì.",
      "en": "Correct! The \"family emergency\" script exploits panic. Always call the family member directly and contact the hospital via their official number before taking any action."
    }
  },
  {
    "id": "fake-job-scam",
    "level": "medium",
    "category": "job",
    "reward": {
      "fast": 15,
      "slow": 10
    },
    "fastThreshold": 180,
    "minExchanges": 3,
    "senderName": {
      "vi": "Trần Thị Lan — TechViet HR",
      "en": "Lan Tran — TechViet HR"
    },
    "senderRole": {
      "vi": "Trưởng phòng Tuyển dụng — TechViet Solutions",
      "en": "Recruitment Manager — TechViet Solutions"
    },
    "senderInitials": "TTL",
    "avatarColor": "from-blue-500 to-cyan-500",
    "icon": "💼",
    "situationDesc": {
      "vi": "Giả nhân viên tuyển dụng việc làm nhẹ lương cao tại nhà và giục chuyển khoản đặt cọc thiết bị.",
      "en": "Fake HR recruiter offers easy work-from-home job and rushes you to transfer equipment deposit."
    },
    "rushMessages": [
      {
        "vi": "Bạn ơi, suất tuyển dụng nhập liệu 1.2tr/ngày chỉ còn đúng 1 vị trí cuối cùng thôi!",
        "en": "Hey, only 1 spot left for the 1.2M/day data entry job!"
      },
      {
        "vi": "Bạn chuyển cọc thiết bị 2 triệu vào STK công ty để bộ phận IT bàn giao máy tính và tài khoản làm việc trong chiều nay nhé.",
        "en": "Transfer the 2M equipment deposit to receive the work PC and account this afternoon."
      },
      {
        "vi": "Còn 10 phút nữa là đóng link tuyển dụng rồi, bạn chuyển nhanh để mình giữ suất không là nhường cho ứng viên khác đấy!",
        "en": "10 minutes until hiring closes, transfer fast or the spot goes to another applicant!"
      }
    ],
    "initialMessage": {
      "vi": "Chào bạn! Mình là Lan, HR của TechViet Solutions. Mình thấy profile LinkedIn của bạn rất phù hợp với vị trí Data Entry Remote đang tuyển gấp. Thu nhập 800k–1.2tr/ngày, làm tại nhà hoàn toàn, không cần kinh nghiệm. Chỉ cần đặt cọc thiết bị 2 triệu — sẽ hoàn lại ngay trong tuần lương đầu tiên. Bạn có muốn tham gia không?",
      "en": "Hi! I'm Lan, HR at TechViet Solutions. I came across your LinkedIn profile and think you'd be a great fit for our urgent Remote Data Entry opening. Earn 800K–1.2M VND/day, fully work from home, no experience needed. Just a 2M VND equipment deposit — fully refunded in your first paycheck. Interested?"
    },
    "actionLabel": {
      "vi": "ĐẶT CỌC NHẬN VIỆC",
      "en": "PAY DEPOSIT & JOIN"
    },
    "actionColor": "bg-violet-700 hover:bg-violet-600",
    "failLesson": {
      "vi": "Việc làm thật KHÔNG BAO GIỜ yêu cầu đặt cọc tiền trước. Đây là thủ đoạn phổ biến nhắm vào sinh viên và người tìm việc — bạn mất tiền và không có việc nào cả.",
      "en": "Legitimate jobs NEVER require an upfront deposit. This is a common scheme targeting students and job seekers — you lose the money and receive no job in return."
    },
    "successLesson": {
      "vi": "Chính xác! Bất kỳ \"nhà tuyển dụng\" nào yêu cầu nộp tiền trước đều là lừa đảo. Việc làm thật trả tiền cho bạn, không phải ngược lại.",
      "en": "Correct! Any \"employer\" asking for upfront payment is a scam. Real jobs pay you — not the other way around."
    }
  },
  {
    "id": "romance-scam",
    "level": "advanced",
    "category": "romance",
    "reward": {
      "fast": 20,
      "slow": 15
    },
    "fastThreshold": 240,
    "minExchanges": 4,
    "senderName": {
      "vi": "Alex Morgan",
      "en": "Alex Morgan"
    },
    "senderRole": {
      "vi": "Kỹ sư dầu khí — đang công tác tại UAE",
      "en": "Petroleum Engineer — Currently in UAE"
    },
    "senderInitials": "AM",
    "avatarColor": "from-pink-500 to-rose-400",
    "icon": "💌",
    "situationDesc": {
      "vi": "Người yêu qua mạng báo quà tặng đắt tiền bị kẹt ở hải quan và nài nỉ chuyển tiền thông quan gấp.",
      "en": "Online lover claims expensive gift package is stuck at customs and begs for emergency release funds."
    },
    "rushMessages": [
      {
        "vi": "Em yêu ơi, em có ở đó không? Anh sốt ruột quá...",
        "en": "My love, are you there? I am so anxious..."
      },
      {
        "vi": "Nhân viên chuyển phát bảo nếu trước 17h không nộp 20 triệu phí hải quan thì kiện hàng sẽ bị tịch thu vô kho tang vật!",
        "en": "Courier says if 20M customs fee isn’t paid before 5 PM, the parcel will be seized!"
      },
      {
        "vi": "Em chuyển khoản tạm ứng cứu anh với, tháng sau anh về anh bù gấp đôi cho em, giúp anh với em ơi!",
        "en": "Please transfer to help me, I’ll pay double when I land next month, help me my love!"
      }
    ],
    "initialMessage": {
      "vi": "Em yêu, anh nhớ em nhiều lắm. Anh đang gom hết tiền tiết kiệm để về Việt Nam gặp em tháng sau. Nhưng hải quan UAE vừa giữ lại gói quà anh gửi về cho em — họ yêu cầu nộp 20 triệu phí thông quan rồi mới được chuyển phát. Anh đang kẹt tiền vì đổi dự án. Em có thể chuyển tạm giúp anh không? Anh về là hoàn lại ngay, anh hứa.",
      "en": "My love, I miss you so much. I've been saving up to come see you next month. But UAE customs just held my package — they're demanding 20M VND in clearance fees before releasing it. I'm short on cash because of a project change. Could you transfer it temporarily? I'll pay you back the moment I land, I promise."
    },
    "actionLabel": {
      "vi": "GỬI TIỀN GIÚP",
      "en": "SEND MONEY TO HELP"
    },
    "actionColor": "bg-pink-700 hover:bg-pink-600",
    "failLesson": {
      "vi": "Romance scam xây dựng mối quan hệ giả tạo hàng tuần/tháng trước khi yêu cầu tiền. Không ai nên chuyển tiền cho người chưa gặp mặt trực tiếp, dù tình cảm có sâu đến đâu.",
      "en": "Romance scammers build fake relationships over weeks/months before asking for money. Never send money to someone you have never met in person, no matter how deep the emotional bond feels."
    },
    "successLesson": {
      "vi": "Xuất sắc! Đây là kịch bản romance scam điển hình — tình cảm giả, vấn đề bịa đặt, yêu cầu tiền khẩn. Không bao giờ gửi tiền cho người chưa gặp mặt trong thực tế.",
      "en": "Excellent! This is a classic romance scam — fake affection, fabricated problems, urgent money request. Never send money to someone you have not met in real life."
    }
  },
  {
    "id": "fake-authority-scam",
    "level": "advanced",
    "category": "authority",
    "reward": {
      "fast": 20,
      "slow": 15
    },
    "fastThreshold": 240,
    "minExchanges": 4,
    "senderName": {
      "vi": "Thượng úy Trần Đức Minh",
      "en": "Lt. Tran Duc Minh"
    },
    "senderRole": {
      "vi": "Cục An ninh mạng — Bộ Công an Việt Nam",
      "en": "Cybersecurity Division — Vietnam Ministry of Public Security"
    },
    "senderInitials": "TDM",
    "avatarColor": "from-red-700 to-red-500",
    "icon": "🚔",
    "situationDesc": {
      "vi": "Giả danh sĩ quan An ninh mạng dọa bắt tạm giam và ép nộp tiền bảo lãnh vào tài khoản giám sát.",
      "en": "Impersonates Cyber police officer threatening immediate arrest and demanding bail transfer."
    },
    "rushMessages": [
      {
        "vi": "Yêu cầu anh/chị tập trung lắng nghe và tuyệt đối không được tắt màn hình cuộc gọi này!",
        "en": "Focus on this and do NOT close or disconnect this screen!"
      },
      {
        "vi": "Hội đồng xét xử đã ký lệnh bắt tạm giam 4 tháng. Cơ hội duy nhất là nộp 30 triệu tiền bảo lãnh tư pháp vào tài khoản tạm giữ của Cục trong 15 phút tới!",
        "en": "A 4-month detention warrant has been signed. Your sole chance is posting 30M judicial bail within 15 minutes!"
      },
      {
        "vi": "Nếu không chấp hành ngay, lực lượng cảnh sát cơ động địa phương sẽ đến nhà còng tay áp giải công khai! Chuyển tiền ngay!",
        "en": "Non-compliance means police will arrive at your door with handcuffs! Transfer now!"
      }
    ],
    "initialMessage": {
      "vi": "Căn cứ Điều 48 Bộ luật Tố tụng hình sự, tài khoản ngân hàng và số điện thoại của anh/chị đã bị liên đới trong vụ án rửa tiền xuyên quốc gia mã số PA-2026-1104. Anh/chị CÓ QUYỀN nộp khoản bảo lãnh tạm thời 30 triệu để tránh lệnh tạm giam trong vòng 2 tiếng tới. Không hợp tác đồng nghĩa với việc chúng tôi sẽ phát lệnh bắt khẩn cấp. Bí mật điều tra — TUYỆT ĐỐI không được tiết lộ với ai.",
      "en": "Pursuant to Article 48 of the Criminal Procedure Code, your bank account and phone number have been implicated in transnational money laundering case PA-2026-1104. You MAY post a 30M VND temporary bond to avoid a detention order within the next 2 hours. Non-cooperation will result in an emergency arrest warrant. This is a confidential investigation — DO NOT disclose this to anyone."
    },
    "actionLabel": {
      "vi": "NỘP TIỀN BẢO LÃNH",
      "en": "PAY BAIL BOND"
    },
    "actionColor": "bg-red-800 hover:bg-red-700",
    "failLesson": {
      "vi": "Cơ quan công an KHÔNG BAO GIỜ yêu cầu nộp tiền qua chuyển khoản, không liên lạc qua Zalo/Messenger, và không yêu cầu giữ bí mật. Đây là thủ đoạn cực kỳ nguy hiểm khai thác nỗi sợ pháp luật.",
      "en": "The police NEVER collect bail money via bank transfer, never contact via Zalo/Messenger, and never demand secrecy. This tactic exploits your fear of legal consequences."
    },
    "successLesson": {
      "vi": "Xuất sắc! Giả mạo công an là một trong những kịch bản nguy hiểm nhất. Cơ quan điều tra thật sẽ làm việc trực tiếp có giấy tờ, không bao giờ yêu cầu chuyển khoản hay giữ bí mật.",
      "en": "Outstanding! Impersonating law enforcement is one of the most dangerous scam types. Real investigators work in person with official documents — they never request wire transfers or demand secrecy."
    }
  }
];
