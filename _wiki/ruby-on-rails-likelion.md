---
layout  : wiki
title   : likelion에서 배운 ruby on rails 정리
summary : Simple CRUD project
date    : 2019-08-12 15:30:50 +0900
updated : 2019-08-12 15:42:31 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

### 프로젝트 내용

* '멋쟁이 사자처럼'에서 진행한 것을 공부한 것입니다. 자세한 정보는 인터넷에서 찾아주시고 전체적인 흐름만 본다고 생각해주세요.
* IDE : C9
* Language : ruby
* Framework : ruby on rails
* github : ![https://github.com/aegis1920/likelion_CRUD_project](https://github.com/aegis1920/likelion_CRUD_project)

#  Scaffold
1. scaffold는 '발판, 기반이 되는 구조물'이라는 뜻입니다.

2. `rails g scaffold Note title:string content:text`
	* 위 코드를 치면 CRUD로 구성된 게시판이 만들어집니다.
	* 일종의 튜토리얼 코드입니다.(rails 스러운 코드)
	* 우리가 배웠던 코드와 조금 다릅니다.(json이라든지, 이상한 부분이 많습니다.)
3. 이전에 만들었던 notes에서 new.html.erb와 edit.html.erb를 보면 비슷한 코드가 중복되어있는 것을 볼 수 있습니다. **컴퓨터 세계에서 중복은 좋지 않습니다.** 그래서 잘 만들어진 코드 scaffold에서는 form 형태로 따로 만들어져있습니다. 일단은 그렇다고만 알아둡시다.
4. 라우팅을 보는 법(scaffold는 전에 만들었던 것과 다릅니다)
	4. `rails routes`를 치면 라우팅 정보를 알 수 있습니다.
	5. `prefix`는 지름길(helper_path)같은 의미로 경로를 간편하게 사용하기 위해 만들어 놓은 것입니다. 동적 링크를 생성하거나 redirection을 이용할 때 얘 하나만 써주면 되니 아주 유용합니다.
	6. scaffold에는 routes.rb가 한 줄로 표현이 되어 있습니다. (`resources :notes`)
		* 이 한 줄의 코드가 모든 RESTful 코드의 기능을 수행합니다. 

## Scaffold에서 Params의 이해

1. scaffold를 뜯어보기 위해서 새로 Article이라는 model과 controller를 만듭니다. 

2. `rails g model Article title:string content:text`
3. `rails db:migrate`
4. `rails g controller articles new show index edit`
5. routes.rb에서 `resource :notes`는 주석처리(`#`)하고 `resources :articles`를 친 후, 터미널에 `rails routes`를 치면 아까 scaffold처럼 나옵니다.
6. articles_controller.rb에 create를 추가합니다.
```ruby
  def create
    debugger
    @article = Article.new
    @article.title = params[:title]
    @article.title = params[:content]
    @aritcle.save
    redirect_to articles_url #path or url(in yoursite/rails/info)
  end
```
7. 그리고 전에 했던 코드의 구조를 보면 show나 destroy나 update, edit 등 똑같은 코드가 들어가는 것을 볼 수 있는데 바로 지정된 데이터를 보여줄 수 있는 `@article = Article.find(params[:id])`라는 코드입니다. 이 중복을 없애주기 위해서 따로 set_article이라는 Action으로 지정해주고, `before_action :set_article, only: [:show, :edit, :update, :destroy]`을 적어줘서 **이 코드가 show, edit, update, destroy에만 적용이 되도록 합니다. 

8. `set_article`의 경우, 컨트롤러 이외에 어떤 곳에서 호출하는 경우가 없기 때문에 `private`을 줘서 다른 곳에서 호출할 경우 에러가 나오도록 하는 역할을 해줍니다.**  `private`이라고 치면 그 밑에는 모두 `private` 이라고 처리합니다.
9. 5. `debugger`를 코드 안에 적어주면 실행되다가 `debugger` 코드가 있는 곳에서 실행이 멈춥니다. 그 때의 DB를 확인할 수 있어 실행 과정을 테스트하거나 오류가 있는지 확인할 수 있습니다. 
```ruby
	private #접근제한자
		def set_article
		  @article = Article.find(params[:id])
	    end
```
10. views/articles/new.html.erb에 코드를 추가합니다.
```ruby
<h1>Articles#new</h1>
<p>Find me in app/views/articles/new.html.erb</p>
<form action='/articles' method='POST'>
    <input type='hidden' name='authenticity_token' value="<%= form_authenticity_token %>"></input><br>
    <input type='text' name='title'></input><br>
    <input type='text' name='content'></input><br>
    <input type='submit'></input>
</form>
```
11. 서버를 실행시킨 후, new.html.erb로 들어가서 입력하면 controller의 create에서 썼던 `debugger`가 작동하여 중지되고, 터미널에 입력할 수 있도록 나오게 됩니다. 

12. `params`를 쳐보면 우리가 new.html.erb에서 쳤던 게 나오게 되는데 보기가 힘드니 gemfile에서 	보기 편하게 해주는 gem을 설치합시다. 
13. gemfile에서 `gem 'pry-rails'`를 설치합니다.
14. `debugger`대신 `binding.pry`를 써줍니다.
15. 이제 아까처럼 서버를 실행시키고 new.html.erb에 입력하고 콘솔창에 `params`를 쳐보면 아까보다는 구별하기 쉽게 나옵니다. 
16. `params.require(:article)`을 치면 우리가 쳤었던 title과 content가 나오게 됩니다. 
17. `params.require(:article).permit(:title, :content)`를 치면 permitted에 true가 뜹니다. 이는 article에서 원하는 속성들만 노출시킬 수 있도록 해주는 것입니다. 즉, 여기서는 article 안에서 title, content만 쓰고 싶다는 말입니다.
18. `rails c --sandbox`(sandbox 모드로 들어가면 실제로 저장되지 않습니다. 그래서 exit을 했을 때 rollback이라고 나오게 됩니다.)
19. articles_controller.rb에서 `Article.create!(title: 'aa', content: 'bb')`는 `@article = Article.new(title: 'aa', content : 'bb')`, `@article.save`와 같습니다. 하지만 이것은 aa와 bb라는 것을 저장하는 것이고, 사용자의 데이터를 받으려면 params를 써야합니다. 이 때 아까 썼던 `params.require(:article).permit(:title, :content)`를 써주면 됩니다. 그래서 중간에 썼던 `@article.title = params[:title]`와`@article.title = params[:content]`가 `@article = Article.new(aritcle_params)`와 같게 됩니다. 
20. 원래 `redirect_to 'articles/#{@article.id}'`로 썼었는데 이는 helper path를 사용한 `article_url(@article.id)`과 같습니다. 그러나 rails가 너무 똑똑해서 `@article`만 써도 알 수 있도록 해놓았습니다.  
21. articles_controller.rb에서 아래의 코드를 변경 & 추가합니다.
```ruby
  def create
    binding.pry
    @article = Article.new(article_params) #두 개의 코드가 하나로 변경
    @aritcle.save
    redirect_to @article #그 article로 가도록 변경
  end

  private #아까 쓴 private 아래에 씁니다. 
   def article_params #위 코드에서 인자로 들어간다
     params.require(:article).permit(:title, :content)
   end	
```

## Helper

1. 이제 쉽게 만들 수 있는 helper를 알아보겠습니다. **helper를 이용하면 보안성이 좋고, 명시적이고 시멘틱한 HTML 코드를 쉽게 생성할 수 있습니다.** 예를 들어, 몇 줄의 ruby 코드를 작성하면 HTML 코드가 생성되는데 class나 id, label, name, 토큰 등 여러 가지 기능을 갖춘 HTML 코드가 생성됩니다. view helper는 기본적으로 ruby 코드입니다. 먼저 `form_for()`라는 메소드를 사용해봅시다. new.html.erb에서 원래 form태그를 주석처리하고 아래의 코드를 넣으면 됩니다. 
```ruby
<%= form_for(@article) do |f| %>
	<%= f.label :title%>
	<%= f.text_field :title %>
	
	<%= f.label :content %>
	<%= f.text_area :content %>
	
	<%= f.submit %>
<% end %>
```
2. 보시다시피 원래 있던 form태그와 비슷하게 구성되어있습니다. 그리고 form태그에 있었던 action, method, authenticity_token이 생략 가능해집니다. 
3. 만약 여기서 값을 변경하거나 추가하고 싶다면 `<%= f.text_field :title, placeholder:'hello', class: 'hack' %>`처럼 ,를 찍고 HTML에 추가하듯이 해주면 됩니다. 다만 submit에 추가하려면 `<%= f.submit value='hi'%>`처럼 ,가 없어야 합니다.

4. 다시 코드로 돌아와서 `<a href='#'>index</a>`와 같은 helper 코드는 `<%= link_to 'index', '#' %>`입니다.  태그 사이에 있는 텍스트가 link_to 바로 뒤에 들어가는 것이고 ,를 하고 난 뒤 뒤에 들어가는 건 링크를 뜻합니다. href에 `#`을 준 것은 아무 활동을 안 하겠다는 뜻입니다. 즉, 클릭해도 아무런 반응이 없습니다. 

5. link_to를 하고 , 뒤에 들어가는 게 url인데 url도 helper의 path, url을 써줍니다. helper의 path, url은 `자신의 웹서버 주소/rails/info`에서 확인할 수 있습니다. 똑같이 따라했다면 `articles_path`부터 시작해서 쭉 써져있을 것입니다. 만약 `new_article_path`라고 치면 rails에서 그것을 해석해 `/articles/new`로 가게 해줄 수 있습니다.
6. 자 이제 차근차근히 show, index, edit, controller(index, destroy, update) 등등에 코드를 추가해주면 됩니다.
7. 이해가 필요할 부분만 보겠습니다.
index.html.erb에서 `<td><%= link_to 'Destroy', article_path(article), method: :delete, data: { confirm: 'Are you sure?' } %></td>`부분에서 url이 `article_path(article)`로 되어있는데 가로 안에 article이 들어가있는 이유는 id를 넣어줘야 하기 때문입니다. 그리고 method를 적어주는 건 애시당초에 a태그이기 때문에 GET 메소드밖에 써주지 못해서 따로 적어주는 것이고요. 


8. 다 썼다면 전에 했던 new.html.erb 와 edit.html.erb 보세요. 파일이 매우 비슷한 것을 확인하실 수 있습니다. 왜냐면 new는 폼을 새로 생성하는 것이고 edit은 원래 있던 폼을 가져오는 것이니까요. helper를 사용하면 edit에 있던 token이나 hidden으로 숨겨놨던 method를 생략해도 자동으로 알아서 추가해줍니다. 그래서 그대로 new에 있던 form을 edit에 붙여도 됩니다. 즉, 중복이 됩니다.(서버를 실행시킨 후, 웹 브라우저에서 edit할 때 f12를 눌러보면 hidden으로 해서 method가 자동으로 들어가있는 것을 확인하실 수 있습니다.)
9. 컴퓨터 세계에서는 중복을 없애줘야 좋은 것입니다. edit과 new에 들어가는 form_for의 helper 코드가 완전히 똑같기 때문에 하나의 파일로 따로 빼고 그 파일을 끌어오는 코드만 넣어주는 방식으로 할 수 있습니다. 그래서 `_form.html.erb`라는 파일을 하나 추가하고 여기에 form_for를 넣어줍니다. 그리고 new.html.erb와 edit.html.erb에 `_form.html.erb`파일을 끌어오는 `<%= render 'form', article: @article %>`를 써줍니다.
10. 끌어오게 되면 인자가 article로 바뀌므로 _form.html.erb 첫 문장에 있는 @article 인자를 article로 바꿔줍니다. 
11. 마지막으로 article 컨트롤러의 update 액션에 update 메소드를 추가해주면 됩니다. 
12. Scaffold는 params(파라미터의 해쉬), helper의 path와 url 이해, argument(인자)의 이동, 중복되어 따로 form 파일을 만들어 준 것만 잘 이해하시면 될 것 같습니다. 

### TODO 주석
TODO 주석은 말 그대로 주석입니다. 이런 TODO 주석이 있는 이유는 대형 프로젝트일 경우, 이 부분을 나중에 고쳐야겠다거나, 여기는 링크가 바뀌었다는 주석을 넣어줬을 때 보통 주석이라면 그 주석을 찾기 위해서 파일을 하나하나 모두 찾아야 합니다. 그러나 TODO 주석이나 FIXME같은 주석을 미리 써놨을 경우, `rails notes`만 쳐주면 그 주석이 어디 있는지 콘솔창에 나오게 됩니다. 

### Scaffold의 css
scaffold는 자체적으로 css가 들어가있습니다. 눈썰미가 좋으신 분들은 처음 index파일을 들어갈 때 알아차리셨을 겁니다.  왼쪽 구석에 padding이 들어가있다는 것을 알 수 있습니다. 그 파일은 `/app/assets/stylesheets/scaffolds.scss`에 있는데 혹여나 scaffold를 이용해서 어플을 만드실 때 scaffold에 적용되는 css가 있으니 제대로 다루실 때는 아예 scss 파일을 없애고 시작하는 것도 좋은 방법일 것 같습니다. (참고로 scss는 css의 다른 형태라고 보시면 됩니다. 좀 더 좋은 css라고 생각하세요)

## devise (회원가입)

1. gemfile에 `gem 'devise'`를 추가하고 `bundle install`을 해줍니다.
2. `rails g devise:install`로 devise를 설치해줍니다. 
3. devise를 쓰려면 root url이 필요하다고 하므로 `routes.rb`에 `root 'articles#index'`를 추가해줘서 바로 index로 가게 합니다. 
4. `rails g devise User` 를 쳐서 진짜 devise를 만들어줍니다. 
5.  `rails db:migrate`
6. 회원이 로그인을 했는지 안 했는지 확인하기 위해서 `articles_controller`에 들어가 `before_action :authenticate_user!`를 씁니다.
7. 그리고 실행시켜주면 실행은 되지만 로그아웃 버튼이 없어 로그아웃을 할 수가 없습니다. 그러다 버튼이 없어도 할 수 있긴한데 크롬에서 해당하는 쿠키를 지우면 되긴 합니다.
8. views의 layouts의 `application.html.erb`에서 로그인할 때만 Log out이 있도록 해줍니다.
```html
<% if user_signed_in? %>
	<p><%= current_user.email %></p>
    <p><%= link_to 'Log out', destroy_user_session_path, method: :delete %></p>
<% end %>
```
 8. 그리고 로그인을 하지 않았을 때도 show와 index 액션에서는 게시물이 보이도록 `notes_controller`에 들어가 `before_action :authenticate_user!, except: [:show, :index]`를 써줍니다.

 12. 유저와 게시판과의 관계를 연결시켜주기 위해서 article.rb에서 `belongs_to :user`와 유효성 검사를 위해 `validates :user, presence: true`를 추가하고, user.rb에 `has_many :articles`를 추가합니다.

9. `rails c`를 하고 난 다음에 `u = User.find 1`을 해준다. 그리고 `u.articles`를 치면 해당하는 유저의 article이 나옵니다.
10. 그러나 문제점이 있는데 다른 사람이 로그인해도 다른 사람의 글에 edit이나 destroy가 가능하다는 것입니다. 이를 방지하기 위해 if문으로 최근 유저와 현재 글의 유저가 같은지 확인합니다. 다르면 아예 안 보여주도록 합니다. 다 보이는 곳에 써줘야 하므로 index.html.erb에 씁니다.
```html
<% if article.user == current_user %>
        <td><%= link_to 'Edit', edit_article_path(article) %></td>
        <td><%= link_to 'Destroy', article_path(article), method: :delete, data: { confirm: 'Are you sure?' } %></td>
<% end %>
```
이렇게 안 보이게 할 수 있지만 너무 임시방편이라는 생각이 듭니다. 그리고 url에 ~/edit이라고 치면 어차피 들어갈 수 있습니다. 
12. articles_controller에 check_user 함수를 작성해서 edit과 destroy를 누른다면 redirect가 되도록 합니다. 
 
 ```ruby
     def check_user
      if @article.user != current_user
        redirect_to root_url
      end
    end
 ```

# kaminari(게시판 페이징)
1. 새로운 Ruby 프로젝트를 만들어줍니다.
2. `rails g model Post title:string content:text` //모델 Post를 만들어 줍니다.
3. `rails g controller posts` //Post의 컨트롤러인 posts controller를 만들어줍니다.
4. 아래의 코드를 db 폴더에 `seeds.rb`에 추가해 Post를 100개 정도 만들어 줍니다. 
```ruby
(1..100).each do |i|
	Post.create(title: "title#{i}", content: "content#{i}")
end
```
5. `rake db:migrate`
6. `rake db:seed`를 통해 seed 코드를 실행시킵니다. 
7. `rails c`를 한 후, `Post.all.count`를 치면 몇 개가 들어있는지 나오게 됩니다. 아마 100이 나올 것입니다.
8. posts_controller.rb에 아래의 코드를 추가합니다.
```ruby
def index
	@posts = Post.page(params[:page])
end
```
9. views의 posts에서도 index.html.erb를 생성하고 아래의 코드를 추가합니다.
```ruby
<% @posts.each do |post| %>
<p> <%= post.id %> <%= post.title %> </p>
<% end %>
<%= paginate @posts %>
```
10. 들어가자마자 바로 index로 들어가기 위해 routes.rb에 `root 'posts#index'`를 쳐줍니다. 
11. gemfile에 `gem 'kaminari'`를 추가한 후, `bundle install`을 해줍니다.
12. 이제 게시판의 페이징이 완성되었습니다. 서버를 켠 후, 웹페이지에 들어가보면 전부 default값으로 페이징이 완성되어있는 것을 볼 수 있습니다. 만약 페이징의 부분을 바꾸고 싶다면 어떻게 해야할까요?
13. `rails g kaminari:config`를 치면 config/initializer폴더 안에 kaminari_config.rb 파일이 새로 생성됩니다.  이 파일에서 주석처리되어있는 것을 풀고 수정할 부분을 수정하면 됩니다. 
14.  posts_controller.rb에서 `@posts = Post.page(4)`의 의미는 4번째 페이지를 의미합니다. `@posts = Post.offset(75).limit(25)` 와 같습니다. 즉, 76번째의 글부터 100번째인 총 5개까지 쓰겠다라는 의미입니다. 
15. 그리고 locales 폴더의 en.yml 파일을 바꿔주면 페이징에 해당하는 각 이름들('Next'로 되어있는 기본값을 '다음'이라는 한국말처럼)을 바꿔줄 수 있습니다. 

# Cancancan & Rolify(권한 적용)
1. 새로운 프로젝트를 만들어줍니다.
2. `rails g scaffold Post title:string content:text`로 쉽게 발판을 만들어줍니다. 
3. migrate폴더 안에 있는 posts.rb에 `t.integer :user_id`를 추가해줍니다. 
4. 혹시 모르니 `rake db:drop`을 한 번 해주고 `rake db:migrate`를 해줍니다. 
5. 아래의 잼들을 추가하고 설치합니다. 
```ruby
gem 'devise' #회원가입 및 로그인을 용이하게
gem 'cancancan' #권한부여
gem 'rolify' #역할과 등급부여
```
```ruby
bundle install
rails g devise:install
rails g devise User
rails g cancan:ability
rails g rolify Role User
rake db:migrate
```
6. 유저(User)와 게시글(Post)의 관계(1:N)를 만들어주기 위해서  post.rb에 `belongs_to :user`를 써주고 user.rb에 `has_many :posts`를 써줍니다. 
7. id 3개를 만들고, 각각 id에 대해 게시글 3개를 만들어주기 위해 seeds.rb에 다음 내용을 추가해줍니다.
```ruby
(1..3).each do |i|
	User.create(email: "niboh#{i}@gmail.com", password: "niboh#{i}", password_confirmation:"niboh#{i}")
	(1..3).each do |j|
		Post.create(user_id: i, title: "title#{i}#{j}", content: "content#{i}#{j}")
	end
end
```
8.  seed를 적용시키기 위해 `rake db:seed`를 쳐줍니다.
9. 로그인 없이는 들어갈 수 없도록 `authorize! :write, @post`를 posts_controller의 new 액션에 추가합니다. 
10. login하지 않고 들어갔을 때는 sign_in이 나오고 login을 했을 때는 sign_out이 나오도록index.html.erb에 코드를 추가합니다.
```ruby
<%= link_to 'New Post', new_post_path %>
<% if current_user.nil? %> 
  <%= link_to 'Sign_in', new_user_session_path %>
<% else %> #
  <%= link_to 'Sign_out', destroy_user_session_path, method: 'delete' %>
<% end %>
```
11. 로그인을 한 경우에만 쓸 수 있도록 ablitity.rb에 코드를 추가합니다.(이미 주석처리가 되어있을 수 있습니다.) 
```ruby
if user.nil?
  can :read, :all
else
  #로그인 한 경우에만 쓸 수 있도록.
  can [:read, :write], :all
end
```
12. `rails c`로 가서 유저를 한 명 정합니다. 
13. 첫 번째 유저를 관리자로 정하고 싶은 경우, `User.first.add_role 'admin'`라고 쳐줍니다. 
14. 확인을 하고 싶다면 `User.first.has_role? 'admin`을 치면 됩니다. 차례로 두 번째와 세번째에 매니저 권한과 뉴비 권한을 적용시켜봅시다.
15. `User.second.add_role 'manager'`
16. `User.third.add_role 'newbie'`
17. 각각의 등급마다 권한을 정합니다. ability.rb에서 아래의 코드를 쓰면 됩니다. 유저가 아예 없을 떄, newbie, manager, admin으로 나눠지고 newbie같은 경우, 읽고 쓸 수 있지만 자신의 아이디에 한해서만 수정하고 삭제할 수 있습니다. 
```ruby
if user.nil?
  can :read, :all
elsif user.has_role? 'newbie'
  can [:read, :create], :all
  can [:update, :destroy], Post, user_id: user.id
elsif user.has_role? 'manager'
  can [:read, :create, :update], :all
  can :destroy, Post, user_id: user.id
elsif user.has_role? 'admin'
  can [:read, :create, :update, :destroy], :all
end
```
18. 그리고 어떠한 액션에 어떤 권한을 적용시킬 것인지 정해줘야하는데 posts_controller.rb에 아래의 코드를 쓰면 다 알아서 해줍니다. 그리고 나면 아까 썼던 `authorize! :write, @post`는 지워도 됩니다. 
`load_and_authorize_resource`

# File Upload to local & S3(이미지 업로드)
1. 새로운 프로젝트를 만듭니다. 
2. 잼을 추가하고 `bundle install`해줍니다. 
```ruby
gem 'fog-aws'#파일을 aws s3에 업로드를 가능하게 해줌.
gem 'mini_magick' #이미지 크기 조정
gem 'carrierwave'#파일업로드
```
3. `sudo apt-get update`를 쳐서 업데이트를 한 번 해줍니다. 
4. mini_magick을 사용하기 위해서는 imagemagick을 먼저 설치해야하므로 `sudo apt-get install imagemagick`을 칩니다. 
5. `rails g scaffold Post title:string content:text image:string`로 뼈대를 만들어줍니다.  (아까 했던 프로젝트와 동시에 하려면 table에 image 데이터를 추가하고, post_controller.rb에 있는 post_params 액션에 :image를 추가합니다. )
6. _form.html.erb로 가서 맨 위에 있는 코드인 `form_for(@post, html: {multipart:true})`로 멀티파트를 추가해줍니다. 
7. 그리고 _form.html.erb에서 아래 코드에 `<%= f.text_fleid ~` 부분을 `f.file_fleid ~`로 바꿔줍니다. 
8.  `rake db:migrate`를 칩니다. 
9. carrierwave를 쓰기 위해서 `rails g uploader Image`를 입력합니다. 
10. image_uploader.rb 파일에서 `include CarrierWave::MiniMagick`과 `version :thumb ~ end`주석을 풀어줍니다. (또 하나의 버전으로 업로드 50:50으로 이미지를 업로드 한다는 소리, 비율을 그대로 가져온다. 절대적인 크기로 가져오고 싶다면 `resize_to_fit`이 아니라 `resize_to_fill`로 바꾸면 됩니다. )
11. `storage:file`의 주석도 풀어줍니다.
12. `def store_dir ~ end`는 저장되는 디렉토리를 말해줍니다.
13. initialize폴더에 carrierwave.rb를 만들어서 `require 'carrierwave/orm/activerecord'`를 써줍니다. 
14. model에 있는 post.rb 파일에 `mount_uploader :image, ImageUploader`를 써줍니다.
15. index.html.erb에서도 적당한 위치에 불러오는 이미지 태그를 써줍니다. `<td> <%= image_tag post.image.thumb.url %> </td>`
16.  show.html.erb에서도 태그를 써줍니다. `<strong>Image</strong> <%= image_tag @post.image.url %>` Image_tag라는 헬퍼가 url을 html태그로 변환시켜 줍니다. 

**여기까지가 로컬로 업로드를 하는 방법입니다. 이제 AWS s3에 올리는 방법을 알아보겠습니다.**

1. AWS 서버에 가입해서 S3 서비스를 선택한 후, Bucket을 만듭니다. 
2. 그리고 자신의 개인정보쪽에 있는 Sercurity Credentials에 갑니다. 
3. Create New Access Key를 통해 보안 키를 만든 후, 해당하는 보안 키의 id와 password를 따로 저장해둡니다. 
4. 다시 C9으로 돌아와서 carrierwave.rb 파일에 아래의 코드를 복붙합니다. (config.fog_directory에는 자신의 S3 bucket 이름을 쓰시면 됩니다.)
```ruby
CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'                        # required
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     "#{ENV['AWS_KEY']}",                        # required unless using use_iam_profile
    aws_secret_access_key: "#{ENV['AWS_SECRET']}",                        # required unless using use_iam_profile
    region:                'ap-northeast-2',                  # optional, defaults to 'us-east 
  }
  config.fog_directory  = 'c9c9test' # required
end
```
5. 환경변수로 id와 password로 저장했기 때문에 따로 파일을 저장해줘야 합니다. 
```php
echo "export AWS_KEY=자신의 id값" >> ~/.profile
echo "export AWS_SECRET=자신의 password값" >> ~/.profile
source ~/.profile
echo $AWS_KEY #그냥 확인차 뽑아보기
```
. local이 아니라 aws를 쓰는 거기 때문에 image_uploader.rb 파일로 가서 `storage :file`을 `storage :fog`로 바꿔줍니다.

> **주의할 점** 
> 혹시나 `rake db:drop`을 했을 경우, seed를 통해 유저를 만들고 `rails c`를 통해 콘솔로 간 다음,`add_role?`을 통해 유저의 등급또한 만들어줘야합니다. 

#  Deploy to Heroku

22. rails는 기본적으로 3가지 환경이 있습니다. 개발(development), 테스트(test), 배포(production)가 있습니다. gemfile에서 gem들을 이 3가지 환경으로 구분지어서 그 환경에서만 gem들이 활성화될 수 있도록 할 수 있습니다. 예를 들어, `gem rails_db` 같은 경우, 사용자들이 URL만 조금 수정하면 DB 자체를 조회하고 수정하고 삭제할 수 있기 때문에 개발환경에서만 사용가능하게 해야합니다. 

23. 옛날 C9은 Heroku 설치가 되어있지만 AWS C9은 설치가 안 되어있습니다. 
...
24. `heroku create`를 치면 나와있습니다. 
25. `git push heroku master`
26. `heroku run bundle install`

# Simple CRUD Project

### Terminal Input
1. `bundle install`
	* for rails_db and rails version in gemfile
2. `rails g controller notes edit index new show`
	* controller는 소문자 + 복수
	* notes는 컨트롤러 이름
	* 그 뒤부터는 action들의 이름
3. `rails g model Note title content`
	* model은 대문자 + 단수
	* Note은 model의 이름
	* 그 뒤부터는 model에 들어갈 칼럼들의 이름 
4. `rails db:migrate`
	* db에서 scheme이 변경된 걸 적용해줍니다.

## Simple Data Flow(index action, create action)
1. 사용자가 URL에 https://abcdefghijk.io 를 입력합니다. (위 URL은 임의로 정한 URL로 자신의 웹 서버을 뜻합니다)
2. https://abcdefghijk.io 는 https://abcdefghijk.io/ 와 같으므로 config/route.rb의 루트(`'/'`)를 의미합니다. 그래서  `get '/'` 으로 가게 됩니다. (여담으로 보통 URL 맨 뒤에 '/'를 써주지 않는 이유는 써주지 않는 게 REST의 Convention이기 때문입니다.)
3. **`get '/' => 'notes#index'`의 의미는 URL로 루트('/')를 받으면 app/concerns/notes_controller.rb라는 루비 파일(notes 라는 컨테이너)에 가서 index라는 action(메소드)을 실행한다는 뜻입니다.** (참고로 루트로 가는 `get '/' =>`은 root라고 써도 동일한 의미입니다. 그래서 위의 코드는 `root 'notes#index'`의 의미와 같습니다. 또한 그냥 `get 'notes/create'`은 `get 'notes/create' => 'notes#create'`와 같습니다. 즉, 동일한 컨트롤러와 동일한 액션으로 가는 것은 뒷 부분(`=> 'notes#create'`)을 생략해도 됩니다. 는 )
4. index라는 action은 아래와 같이 정의(definition, def)되어 있습니다.  
```ruby
def index
	#이 의미는 인스턴스 변수(@notes) 안에 테이블 객체(Note)의 모든걸(.all) 할당해준다(=)는 의미입니다.
	@notes = Note.all
end
```
5. **컨테이너에서의 action이 끝나면 view 파일이 있는지 확인합니다. app/views/notes에 가보면 index의 view 파일(index.html.erb)도 있으므로 실행합니다. (redirect가 없이 view 페이지가 없다면 오류가 뜹니다.)**
6.  HTML이 렌더링되어 화면에 페이지(index.html.erb)가 뜹니다.
7. 사용자가 input 태그와 textarea 태그에 정보를 입력합니다.
8. input 태그에 입력한 것은 input_title라는 이름으로 매개변수가 되고, textarea 태그에 입력한 것은 input_content라는 이름으로 매개변수가 됩니다. 
9. 사용자가 type 속성이 submit인 input 태그를 클릭합니다.
10. **input태그와 textarea 태그는 form으로 싸여져 POST의 방식으로 action 속성에 있는대로 https://abcdefghijk.io/notes/create 로 보내지게 됩니다.**
11. 아까 한대로 URL이니 route.rb를 보면 notes라는 컨트롤러의 create action으로 가게 됩니다. 
12. note_controller.rb에 create action 은 아래와 같이 구성되어 있습니다. 
```ruby
def create 
  note = Note.new 
  note.title = params[:input_title] 
  note.content = params[:input_content]
  note.save
  redirect_to "/"
end
```
13. note이라는 변수에 Note 객체의 한 줄(table의 row)을 추가해줍니다.  
14. 그 객체의 한 줄에서 title 부분에는 input_title이라는 심볼(:)을 넣어주고
15. 그 객체의 한줄에서 content 부분에는 input_content라는 심볼(:)을 넣어줍니다. 
16. 확정해주기 위해서 save를 해줍니다. 
17. create라는 view 파일을 찾지만 없으니 redirect를 해줍니다. `'/'`로 되어있으니 URL이 /로 가게 됩니다. 
18. 즉, 사용자가 입력한 title과 content가 db라고 할 수 있는 table로 가게됩니다. 

> 	view파일에서 <%= %>와 <%%>의 차이
> - <%= %> - 루비 문법을 실행하고 출력
> - <%%> - 루비 문법을 실행. 출력은 하지 않음.

## CSRF의 방어
* CSRF(Cross-site Request Forgery)
	* 유명한 사이트의 URL과 유사하게 만들어서 이쪽 내가 만든 서버로 들어오게 합니다.  
	* 아이디와 패스워드를 입력하는 곳까지 완벽하게 똑같이 만들어서 사용자가 입력하게 합니다. 
	* 우리가 만든 notes 컨트롤러 안에 있는 Create action처럼 params를 통해 아이디와 패스워드를 빼옵니다.
	* action을 통해서 본래 있었던 정상적인 유명한 사이트의 URL로 가게 해서 정상적으로 작동한 것 처럼 보이게 합니다.  
* 비밀번호를 쓸 때 GET 방식의 경우 URL에 나타나니까 보안의 우려로 쓰지않습니다. 그래서 POST를 쓰게 됩니다.
* 그러나 위에 말한 것과 같이 CSRF같은 공격이 있으니 POST의 방식을 쓸 때 무작위로 생성되는 token과 함께 포함해서 줘서 방어합니다. 
* rails는 POST 방식일 경우, 기본값으로 token을 사용하도록 되어있습니다. app/controllers/application_controller.rb 파일에서 `protect_from_forgery with: :exception` 이 부분이 rails에서 token을 쓸지 안 쓸지 정해줍니다. 이 부분을 주석처리하면 token을 안 써줘도 됩니다. 
* **그래서 controller 파일에  token을 생성해주고 그에 따라 view 파일의 form에도 넣어줍니다.**

## 'Restful하다'의 의미
* REST(Representational State Transfer)
* 웹의 장점을 최대한 활용할 수 있는 아키텍쳐입니다.
* routes.rb에 보면 HTTP 메소드의 방식으로 GET을 쓰고 있습니다.
* GET만 쓰게 되면 `/members/delete/1` 처럼 delete면 delete, update면 update라고 URL에 다 써줘야 합니다. 
* CRUD는 POST, GET, PUT/PASTE, DELETE라는 HTTP 메소드를 이용해 표현할 수 있습니다. 
* 그래서 GET을 이용해 CREATE을 했던 부분에 POST를 쓰고, READ는 GET, UPDATE에는 PATCH(PUT과 비슷하다고 생각하면 됩니다. ), DESTROY에는 DELETE를 씁니다.

## Comment(댓글 기능 만들기)
게시판에 Comment를 남기고 싶다면? 어떻게 하면 comment를 남길 수 있을까요?
* comment라는 컬럼을 추가하면? -> 컬럼을 추가하게 되면 그 내용에 댓글을 100개를 달았을 때 100개의 칼럼이 되버립니다.
* 결론은 Notes Table, Comment Table. 테이블을 두 개를 만드는 것입니다.

### 데이터베이스 관계와 접근

1. `rails g model Comment content:string note:belongs_to`
	* Comment라는 model을 새로 생성합니다. 
	* content라는 이름의 칼럼과 전에 만들었던 note라는 model에 속하도록 합니다.
2. `rails db:migrate`
3. comment.rb에는 `belongs_to :note`가 적혀져 있고 note.rb에는 `has_many :comments` 를 따로 써줘야 합니다.
	* comment는 Owner(note)에게 속해있고 note는 여러 개의 items(comments)를 가지고 있습니다.  1:N의 관계가 성립됐습니다. 
	* `foreign_key: true`는 이게 외래 키라고 그냥 명시적으로 알려주는 역할입니다.
4. `rails c` (Note와 Comment에 데이터베이스를 여러 개 추가해줍니다.)
	4. `n = Note.new`
	5. `n.title = 'memo1'`
	6. `n.content = 'hello world1'`
	7. `n.save`
		* 위의 4줄과 동일한 의미의 코드
		1. `Note.create! title: 'memo1', content: 'hello world1'`
			* !를 쓰면 error log로 더 자세히 왜 틀렸는지 알려줍니다. !를 안 쓰면 error log를 별로 안 써줍니다.
		2. `n = Note.new title: 'memo1', content: 'hello world1' 한 후, n.save`
		3. `Comment.create content: 'Comment1', note_id: 2` 등등...
	8. 데이터베이스는 여러 가지 명령어로 접근할 수 있습니다. 
		* 데이터베이스를 수정하려면 -> `c = Comment.find 5`로 찾아서 `c.content = '2*5 = 10'`로 수정해주고 `c.save`
		* (가장 최근의) 데이터 베이스를 삭제하려면 -> `c = Comment.last`로 접근해서 `c.destroy`
		* `Note.find(1).comments`
		* `Comment.find(1).id`
		* `Comment.all.first.note_id`

### controller를 만들고 .html.erb 파일과 .rb 파일에 코드를 추가
1. `rails g controller Comments` 
2. comments_controller.rb에 create action과 destory action을 만듭니다. 댓글은 notes의 show.html.erb 파일에서 보여지기 때문에 view 페이지가 필요없습니다.
3. notes의 show.html.erb -> note의 id에 접근하기 위해서 type 속성을 hidden으로 줍니다. 그리고 a 태그는 http get 메소드만 지원하기 때문에 data-method로 따로 속성을 지정해줍니다.
```html.erb
<input type='hidden' name='note_id' value=<%= @note.id %></input>
...
<% @note.comments.each do |comment| %>
	<p>
	    <%= comment.content %> | 
	    <!--a tag is just support get HTTP method. so, we used data-mathod attribute-->
	    <a href='/comments/<%= comment.id %>' data-confirm='댓글을 입력하세요' data-method='DELETE'>삭제</a>
	</p>
<% end %>
```
 4. routes.rb파일 에는 댓글 생성과 삭제에 해당하는 곳에 HTTP 메소드을 추가합니다. 
```ruby
#Comment
  #Create
  post '/comments' => 'comments#create'
  #Destroy
  delete '/comments/:id' => 'comments#destroy'
```
5. `debugger`를 코드 안에 적어주면 실행되다가 `debugger` 코드가 있는 곳에서 실행이 멈춥니다. 그 때의 db들을 확인할 수 있습니다. 

## 배워서 무엇을 했나?

* ![삼육대학교 멋쟁이 사자처럼](http://sahmyook.likelion.org/)
* 불평불만을 수시로 접수할 수 있는 웹 페이지
