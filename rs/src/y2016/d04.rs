use itertools::Itertools;
use regex::Regex;
use std::collections::HashMap;

use std::time::Instant;

static YEAR: i16 = 2016;
static DAY: i8 = 4;

#[derive(Debug)]
pub struct Room {
    sector_id: String,
    decoy: String,
    text: String,
}

fn parse_line_to_room(line: &str) -> Room {
    let input_re = Regex::new(r"(.*)\-(\d+)\[(.*)\]").unwrap();

    let c = input_re.captures(line).unwrap();

    let sector_id = c.get(2).map_or("".to_string(), |x| x.as_str().to_string());
    let decoy = c.get(3).map_or("".to_string(), |x| x.as_str().to_string());
    let text = c.get(1).map_or("".to_string(), |x| x.as_str().to_string());
    Room {
        sector_id,
        decoy,
        text,
    }
}

fn parse(input: &str) -> Vec<Room> {
    let mut rooms: Vec<Room> = Vec::new();
    for l in input.lines() {
        let room = parse_line_to_room(l);
        rooms.push(room);
    }
    rooms
}

pub fn main() {
    println!("Aoc YEAR {} DAY: {:02}", YEAR, DAY);
    let mut t: Instant;

    let input = std::fs::read_to_string(format!("../input/{}/{:02}.txt", YEAR, DAY)).unwrap();
    dbg!(&input[..13]);

    let parsed = parse(&input);

    t = Instant::now();
    let res = solve_part1(&parsed);
    dbg!(t.elapsed().as_micros());
    dbg!(&res);

    t = Instant::now();
    let res2 = solve_part2(&parsed);
    dbg!(t.elapsed().as_micros());
    dbg!(&res2);
    //1342
    //152
}

pub fn is_real_room(room: &Room) -> bool {
    let text = room.text.replace("-", "");
    let mut letters: HashMap<char, i32> = HashMap::new();
    for c in text.chars() {
        let counter = letters.entry(c).or_insert(0);
        *counter += 1;
    }
    let v: String = letters
        .iter()
        .sorted_by(|a, b| Ord::cmp(&b.1, &a.1).then(Ord::cmp(&a.0, &b.0)))
        .take(5)
        .map(|f| f.0)
        .collect();

    room.decoy == v
}

pub fn solve_part1(input: &Vec<Room>) -> String {
    input
        .iter()
        .filter(|r| is_real_room(*r))
        .map(|x| x.sector_id.parse::<usize>().unwrap())
        .reduce(|acc: usize, item: usize| acc + item)
        .unwrap_or(9)
        .to_string()
}

static ASCII_LOWER: [char; 26] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z',
];

fn decrypt(s: &str, rotate: &HashMap<char, char>) -> String {
    s.chars().map(|a| rotate.get(&a).unwrap_or(&'.')).collect()
}
pub fn solve_part2(input: &Vec<Room>) -> String {
    let goal = ["northpole", "object", "storage"];
    for x in input.iter().filter(|r| is_real_room(*r)) {
        let rotate = x.sector_id.parse().unwrap_or(0) % 26;
        let mut d: HashMap<char, char> = HashMap::new();

        for l in ASCII_LOWER.iter().enumerate() {
            d.insert(*l.1, *ASCII_LOWER.get((l.0 + rotate) % 26).unwrap_or(&'.'));
        }

        let s: Vec<String> = x.text.split("-").map(|word| decrypt(word, &d)).collect().join(" ");
        //dbg!(&s.join(" "));
        if s.eq(&goal) {
            return x.sector_id.clone();
        }
    }
    "".to_string()
}

#[test]
fn test_solve1() {
    let example1 = r#"aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]"#;
    let input = parse(example1);
    let expected = String::from("1514");

    assert_eq!(solve_part1(&input), expected);
}
#[test]
fn test_solve2() {
    let example1 = r#"aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]"#;
    let input = parse(example1);
    let expected = String::from("1514");

    assert_eq!(solve_part1(&input), expected);
}
